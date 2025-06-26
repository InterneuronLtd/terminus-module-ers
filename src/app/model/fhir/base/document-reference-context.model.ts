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
import { CodeableConcept } from '../data-types/complex-types/codeable-concept.model';
import { Period } from '../data-types/complex-types/period.model';
import { Reference } from '../data-types/special-purpose-data-types/reference.model';
import { BackboneElement } from './backbone-element.model';
import { DocumentReferenceContextRelated } from './document-reference-context-related.model';

export class DocumentReferenceContext extends BackboneElement {
    encounter?: Reference; //(Encounter) }, // Context of the document  content
    event: CodeableConcept[]; // Main clinical acts documented
    period?: Period; // Time of service that is being documented
    facilityType?: CodeableConcept; // Kind of facility where patient was seen
    practiceSetting?: CodeableConcept; // Additional details about where the content was created (e.g. clinical specialty)
    sourcePatientInfo?: Reference; //(Patient) }, // Patient demographics from source
    related: DocumentReferenceContextRelated[]; //	Related identifiers or resources
}