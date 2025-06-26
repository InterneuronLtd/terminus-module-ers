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
import { Annotation } from '../data-types/complex-types/annotation.model';
import { CodeableConcept } from '../data-types/complex-types/codeable-concept.model';
import { Identifier } from '../data-types/complex-types/identifier.model';
import { codeType } from '../data-types/primitive-types/code.model';
import { dateTimeType } from '../data-types/primitive-types/dateTime.model';
import { Reference } from '../data-types/special-purpose-data-types/reference.model';
import { DomainResource } from './domain-resource.model';
import { ListEntry } from './list-entry.model';

export class List extends DomainResource {
    resourceType: string = "List";
    identifier: Identifier[];
    status: codeType;
    mode: codeType;
    title?: string;
    code?: CodeableConcept; // What the purpose of this list is
    subject?: Reference; // (Patient|Group|Device|Location) }, // If all resources have the same subject
    encounter?: Reference; //(Encounter) }, // Context in which list created
    date?: dateTimeType; // When the list was prepared
    source?: Reference; // (Practitioner|Patient|Device) }, // Who and/or what defined the list contents (aka Author)
    orderedBy?: CodeableConcept; // What order the list has
    note: Annotation[]; // Comments about the list
    entry: ListEntry[];
    emptyReason?: CodeableConcept; // C? Why list is empty
}