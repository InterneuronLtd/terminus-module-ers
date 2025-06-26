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
import { Identifier } from '../data-types/complex-types/identifier.model';
import { codeType } from '../data-types/primitive-types/code.model';
import { dateTimeType } from '../data-types/primitive-types/dateTime.model';
import { instantType } from '../data-types/primitive-types/instant.model';
import { Reference } from '../data-types/special-purpose-data-types/reference.model';
import { DocumentReferenceContent } from './document-reference-content.model';
import { DocumentReferenceContext } from './document-reference-context.model';
import { DocumentReferenceRelatesTo } from './document-reference-relates-to.model';
import { DomainResource } from './domain-resource.model';

export class DocumentReference extends DomainResource {
    resourceType: string = "DocumentReference";
    // from Resource: id, meta, implicitRules, and language
    // from DomainResource: text, contained, extension, and modifierExtension
    masterIdentifier?: Identifier; // Master Version Specific Identifier
    status: codeType; // R!  current | superseded | entered-in-error
    docStatus?: codeType; // preliminary | final | appended | amended | entered-in-error
    type: CodeableConcept; // R!  Kind of document (LOINC if possible)
    class?: CodeableConcept; // Categorization of document
    subject?: Reference; //(Patient|Practitioner|Group|Device) }, // Who/what is the subject of the document
    created?: dateTimeType; // Document creation time
    indexed: instantType; // R!  When this document reference was created
    author: Reference[]; //(Practitioner|Organization|Device|Patient|RelatedPerson) }], // Who and/or what authored the document
    authenticator: Reference; //(Practitioner|Organization) }, // Who/what authenticated the document
    custodian: Reference; //(Organization) }, // Organization which maintains the document
    relatesTo: DocumentReferenceRelatesTo[]; // Relationships to other documents
    description?: string; // Human-readable description (title)
    securityLabel: CodeableConcept[]; // Document security-tags
    content: DocumentReferenceContent[]; //Document referenced
    context: DocumentReferenceContext; // Clinical context of document
}