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
import { dateTimeType } from '../data-types/primitive-types/dateTime.model';
import { Extension } from '../data-types/special-purpose-data-types/extension.model';
import { Reference } from '../data-types/special-purpose-data-types/reference.model';

export class ListEntry {
    flag?: CodeableConcept;
    deleted?: boolean;
    date?: dateTimeType;
    item: Reference;

    //extension property is from NHS FHIR STU3 standard
    extension: Extension[];
}