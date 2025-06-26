//BEGIN LICENSE BLOCK 
//Interneuron Terminus

//Copyright(C) 2025  Interneuron Limited

//This program is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.

//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

//See the
//GNU General Public License for more details.

//You should have received a copy of the GNU General Public License
//along with this program.If not, see<http://www.gnu.org/licenses/>.
//END LICENSE BLOCK 
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './services/api.service';
import { AppService } from './services/app.service';
import { ModuleObservablesService } from './services/module-observables.service';
import { HttpClient } from '@angular/common/http';
//import { ProfessionalSession } from './model/FHIR/ProfessionalSession.model';
//import { Specialty } from './model/FHIR/Specialty.model';
//import { ClinicType } from './model/FHIR/ClinicType.model';
//import { AppointmentCancelReason } from './model/FHIR/AppointmentCancelReason.model';
import { Referral } from './model/referral.model';
import { ReferralRequest } from './model/fhir/resources/workflow/referral-request.model';
import { ReferralWorklist } from './model/fhir/resources/workflow/referral-worklist.model';
import { DocumentReference } from './model/fhir/base/document-reference.model';
import { DynamicApiRequestService } from './services/dynamic-api-request.service';
import { Document } from './model/document.model';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  private sessionKey;

  private loadTestData: boolean = false;

  public isViewMode: boolean = false;

  public isDocumentDownloaded: boolean = false;

  public isLoading: boolean = false;

  

  public baseURL: string = '';
  public referrals: Referral[] = [];

  public selectedReferral: Referral = null;
  public selectedReferralRequest: ReferralRequest = null;
  public selectedReferralDocuments: Document[] = [];

  constructor(private api: ApiService,
    private dynamicApiService: DynamicApiRequestService,
    private appService: AppService,
    private moduleObservables: ModuleObservablesService,
    private http: HttpClient) {
    this.subscriptions.add(
      this.moduleObservables.contextChanged.subscribe(() => {
        /*
         * The module is successfully loaded with all configuration 
         * Module code starts from here
        */

        console.log("Testing: Subscribe called")
        this.FetchWorklist();
        
      })
    );
  }

  async ngOnInit() {
    // var value: any = {};
    // value.contexts = JSON.parse("[{\"encounter_id\": \"4123ba14-0cc1-4751-aab9-26dd978baffe\", \"person_id\": \"024b806d-5dd2-449b-8370-427da60fd00b\"}]");
    // value.personId = "024b806d-5dd2-449b-8370-427da60fd00b"; //ALLEN, Catherine

    // this.appService.personId = "024b806d-5dd2-449b-8370-427da60fd00b";
    // this.appService.contexts = value.contexts;

    // value.apiService = {};
    // value.apiService.authService = {};
    // value.apiService.authService.user = {};
    // let auth = this.dynamicApiService.authService;
    // auth.getToken().then(async (token) => {
    //   value.apiService.authService.user.access_token = token;
    //   await this.initAppService(value);
    // });
  }

  async GetAccessToken() {
    let sessionKey = await this.dynamicApiService.getRequest(this.appService.ersModuleConfig.dynamicApiEndpoints.getSessionKeyUrl + this.appService.loggedInUserId).toPromise();
    
    return sessionKey;
  }

  ngOnDestroy() {
    console.log("On Destroy Called");
    this.subscriptions.unsubscribe();
    this.moduleObservables.unload.next("app-ers");
  }

  @Input() set datacontract(value: any) {
    this.initAppService(value);
  }

  async initAppService(value: any) {
    this.moduleObservables.unload = value.unload;
    this.appService.dynamicApiServiceRef = value.apiService;
    this.appService.contexts = value.contexts;
    this.appService.personId = value.personId;

    let decodedToken: any;
    if (!this.appService.loggedInUserName) {
      decodedToken = this.appService.decodeAccessToken(this.appService.dynamicApiServiceRef.authService.user.access_token);
      if (decodedToken != null) {
        this.appService.loggedInUserName = decodedToken.name ? (Array.isArray(decodedToken.name) ? decodedToken.name[0] : decodedToken.name) : decodedToken.IPUId;
        this.appService.loggedInUserId = decodedToken.IPUId;
      }
    }

    //this.appService.loggedInUserId = "indiwar jha"

    if (!this.appService.ersModuleConfig) {      
      let response: any =  await this.dynamicApiService.getRequest("./assets/config/ers-module.config.json?v1.0").toPromise();          
      this.appService.ersModuleConfig = response;
      
      this.loadTestData = this.appService.ersModuleConfig.siteSettings.loadTestData;
      
      // Create professionalSession and Select Role  
      await this.CreateProfessionalSession();

      this.moduleObservables.contextChanged.next();
    }
    else {
      // Create professionalSession and Select Role  
      await this.CreateProfessionalSession();      
      this.moduleObservables.contextChanged.next();
    }
  }

  public async CreateProfessionalSession() {
    let accessToken = await this.GetAccessToken();

    let professionalSession: any = await this.api.PostRequest(this.appService.ersModuleConfig.ersApiEndpoints.createProfessionalSessionUrl, 
      JSON.stringify(accessToken), 
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } });

    let selectProfessionalRoleBody = {
      "accessToken": accessToken,
      "sessionKey": professionalSession.rootElement.id
    };

    professionalSession = await this.api.PostRequest(this.appService.ersModuleConfig.ersApiEndpoints.selectProfessionalRoleUrl, 
      JSON.stringify(selectProfessionalRoleBody), 
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    
    this.sessionKey = professionalSession.rootElement.id;    
  }

  public DeleteProfessionalRole(sessionKey: string){
    let options = {
      headers: {
        'XAPI_ASID': '',
        'HTTP_X_SESSION_KEY': ''
      }
    }

    this.api.DeleteRequest(this.appService.ersModuleConfig.ersApiEndpoints.deleteProfessionalSessionUrl, options)
    .then((response) => {
      console.log(response);
    });

  }

  public ReferenceData(codeSystemType: string){
    let options = {
      headers: {
        'XAPI_ASID' : '',
        'HTTP_X_SESSION_KEY' : ''
      }
    }

    this.api.GetRequest(this.appService.ersModuleConfig.ersApiEndpoints.referenceDataUrl, options)
    .then((response) => {
      console.log(response);
    });

    // if(codeSystemType == 'Specialty'){
    //   this.http.get('../assets/sample/Specialty.json')
    //   .subscribe((response: string) => {
    //     let specialty = <Specialty>JSON.parse(response);
    //     console.log(specialty);
    //   })
    // }
    // else if(codeSystemType == 'Clinic Type'){
    //   this.http.get('../assets/sample/ClinicType.json')
    //   .subscribe((response: string) => {
    //     let clinicType = <ClinicType>JSON.parse(response);
    //     console.log(clinicType);
    //   })
    // }
    // else if(codeSystemType == 'Appointment Cancel Reason'){
    //   this.http.get('../assets/sample/AppointmentCancelReason.json')
    //   .subscribe((response: string) => {
    //     let appointmentCancelReason = <AppointmentCancelReason>JSON.parse(response);
    //     console.log(appointmentCancelReason);
    //   })
    // }
  }

  public RetrieveReferralRequest(ubrn: string){
    let options = {
      headers: {
        'XAPI_ASID' : '',
        'HTTP_X_SESSION_KEY' : '',
        'Accept' : 'application/fhir+json'
      }
    }

    this.api.GetRequest(this.appService.ersModuleConfig.ersApiEndpoints.retrieveReferralRequestUrl, options)
    .then((response) => {
      console.log(response);
    });

    // this.http.get('../assets/sample/ReferralRequest.json')
    // .subscribe((response: string) => {
    //   let referralRequest = <ReferralRequest>JSON.parse(response);
    //   console.log(referralRequest);
    // })
  }

  public RetrieveAttachment(attachmentLogicalId: string){
    let options = {
      headers:{
        'XAPI_ASID' : '',
        'HTTP_X_SESSION_KEY' : '',
        'Accept' : '*/*'
      }
    }

    this.api.GetRequest(this.appService.ersModuleConfig.ersApiEndpoints.retrieveAttachmentUrl, options)
    .then((response) => {
      console.log(response);
    });
  }

  public RetrieveClinicalInformation(ubrn: string){
    let options = {
      headers: {
        'XAPI_ASID' : '',
        'HTTP_X_SESSION_KEY' : ''
      }
    }

    this.api.PostRequest(this.appService.ersModuleConfig.ersApiEndpoints.retrieveClinicalInformationUrl, null, options)
    .then((response) => {
      console.log(response);
    });
  }

  public async RetrieveWorklist(){   

    // this.api.PostRequest(this.appService.ersModuleConfig.ersApiEndpoints.retrieveWorklistUrl, sessionKey, null)
    // .then((response) => {
    //   console.log(response);
    // });

    this.http.get('./assets/sample/ReferralWorklist.json')
    .subscribe((response: string) => {
      let referralWorklist = <ReferralWorklist>JSON.parse(response);
      console.log(referralWorklist);
    });

  }

  async FetchWorklist(){
    let referralWorklist = new ReferralWorklist();
    console.log("sessionKey:", this.sessionKey);

    if(!this.loadTestData) {
      let data: any = await this.api.PostRequest(this.appService.ersModuleConfig.ersApiEndpoints.retrieveWorklistUrl, 
        JSON.stringify(this.sessionKey), 
        { headers: { 'Content-Type': 'application/json; charset=utf-8' } });      
      referralWorklist = <ReferralWorklist> data.rootElement;
    }
    else {

      let data:any = await this.http.get('./assets/sample/ReferralWorklist.json').toPromise();
      console.log(data);
      data = JSON.parse(data);
      
      referralWorklist = <ReferralWorklist> data;
    }

    if (!referralWorklist.emptyReason) {
    
      for(var noOfReferralsInWrklst = 0; noOfReferralsInWrklst < referralWorklist.entry.length; noOfReferralsInWrklst++)
      {
        let referral = new Referral();
  
        for(var m = 0; m < referralWorklist.entry[noOfReferralsInWrklst].extension.length; m++){
          
          referral.referralNo = referralWorklist.entry[noOfReferralsInWrklst].item.reference.replace('ReferralRequest/','');
          
          for(var n = 0; n < referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension.length; n++){
            
            if(referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].url == "specialty"){
              for(var noOfSpecialty = 0; noOfSpecialty < referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].valueCodeableConcept.coding.length; noOfSpecialty++){
                referral.specialty = referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].valueCodeableConcept.coding[noOfSpecialty].code;
              }
            }
  
            if(referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].url == "allocatedClinician"){
              referral.referredTo = referralWorklist.contained.find(x => x.id == referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].valueReference.reference.replace('#','') && x.resourceType == 'Practitioner').identifier[0].value;
            }
  
            if(referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].url == "appointmentStart"){
              referral.appointmentDtTime = referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].valueDateTime;
            }
  
            if(referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].url == "priority"){
              for(var noOfPriority = 0; noOfPriority < referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].valueCodeableConcept.coding.length; noOfPriority++){
                referral.priority = referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].valueCodeableConcept.coding[noOfPriority].code;
              }
            }
  
            if(referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].url == "eReferralPathwayStart"){
              referral.referralDate = referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].valueDateTime;
            }
  
            if(referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].url == "patient"){
              referral.patientName = referralWorklist.contained.find(x => x.id == referralWorklist.entry[noOfReferralsInWrklst].extension[m].extension[n].valueReference.reference.replace('#','') && x.resourceType == 'Patient').identifier[0].value;
            }
          }
        }
  
        let addedReferrals = this.referrals.filter(x=> x.referralNo == referral.referralNo);
  
        if(addedReferrals.length == 0){
          this.referrals.push(referral);
        }
      }
    }
  }

  // form events

  async onViewReferral(referral: Referral) {
    this.isLoading = true;
    
    this.selectedReferral = referral;
    
    try {
      if(!this.loadTestData) {
        let referralRequest: any = await this.api.GetRequest(
          this.appService.ersModuleConfig.ersApiEndpoints.retrieveReferralRequestUrl + this.sessionKey + "/" + referral.referralNo,
          { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
        this.selectedReferralRequest = <ReferralRequest>JSON.parse(referralRequest).rootElement;        
      }
      else {
        let referralRequest: any = await this.http.get('./assets/sample/ReferralRequest.json').toPromise();
        this.selectedReferralRequest = <ReferralRequest>JSON.parse(referralRequest);
      }

      this.isViewMode = true;
    }
    catch {
      console.log("Error in loading referral request.");
      return;
    }
    finally {
      this.isLoading = false;
    }

    this.selectedReferralDocuments = [];

    this.selectedReferralRequest.contained.map((container) => {
      if (container.resourceType == "DocumentReference") {
        let documentRef = <DocumentReference>container;
        let document = new Document();

        document.id = documentRef.id;
        if (documentRef.type.coding.length > 0) {
          document.attachmentTypeCode = documentRef.type.coding[0].code;
          document.attachmentTypeText = documentRef.type.coding[0].display;
        }
        document.status = <string> (<unknown> documentRef.status);
        document.indexed = <string> (<unknown> documentRef.indexed);
        document.description = documentRef.description;
        if (documentRef.content.length > 0) {
          document.attachmentId = documentRef.content[0].attachment.id;
          if (documentRef.content[0].extension && documentRef.content[0].extension.length > 0) {
            document.attachedBy = documentRef.content[0].extension[0].valueReference.identifier.value;
          }          
          document.contentType = documentRef.content[0].attachment.contentType;
          document.url = documentRef.content[0].attachment.url;
          document.size = documentRef.content[0].attachment.size;
          document.title = documentRef.content[0].attachment.title;
          document.createdDate = <string> (<unknown>documentRef.content[0].attachment.creation);
        }

        this.selectedReferralDocuments.push(document);
      }
    });

    console.log(this.selectedReferralDocuments);
  }

  async onDownloadDocument(documentId) {
    console.log(documentId);
  }

  async onCloseReferral() {
    await this.FetchWorklist();
    this.isViewMode = false;
  }

  async onViewDocument(document: Document) {
    let downloadedDocument: any = null;
    if(!this.loadTestData) {
      downloadedDocument = await this.http.get('./assets/sample/Document.json').toPromise();
      downloadedDocument = JSON.parse(downloadedDocument);
    }
    else {
      downloadedDocument = await this.http.get('./assets/sample/Document.json').toPromise();
      downloadedDocument = JSON.parse(downloadedDocument);
    }

    const byteCharacters = atob(downloadedDocument.blob);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: document.contentType});    

    saveAs(blob, document.attachmentId + ' ' + document.attachmentTypeText);
  }
}
