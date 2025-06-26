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

export class Address extends Element {
    resourceType: string = "Address";
    // from Element: extension
    use: string; // home | work | temp | old - purpose of this address
    type: string; // postal | physical | both
    text: string; // Text representation of the address
    line: string[]; // Street name, number, direction & P.O. Box etc.
    city: string; // Name of city, town etc.
    district: string; // District name (aka county)
    state: string; // Sub-unit of country (abbreviations ok)
    postalCode: string; // Postal code for area
    country: string; // Country (e.g. can be ISO 3166 2 or 3 letter code)
    period: Period; // Time period when address was/is in use
}