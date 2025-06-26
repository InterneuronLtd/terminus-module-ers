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
import { CodeableConcept } from '../complex-types/codeable-concept.model';
import { Coding } from '../complex-types/coding.model';
import { Quantity } from '../complex-types/quantity.model';
import { Range } from '../complex-types/range.model';
import { Element } from '../../base/element.model';
import { Reference } from '../special-purpose-data-types/reference.model';

export class UsageContext extends Element {
    code: Coding;
    valueCodeableConcept: CodeableConcept;
    valueQuantity: Quantity;
    valueRange: Range;
    valueReference: Reference; 
}