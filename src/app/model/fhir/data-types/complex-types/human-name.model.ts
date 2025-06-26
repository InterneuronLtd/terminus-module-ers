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
import { Element } from '../../base/element.model';
import { Period } from './period.model';

export class HumanName extends Element {
    resourceType: string = "HumanName";
    use: string;
    text: string;
    family: string;
    given: string[]; // Given names (not always 'first'). Includes middle names
    prefix: string[]; // Parts that come before the name
    suffix: string[]; // Parts that come after the name
    period: Period; // Time period when name was/is in use
}