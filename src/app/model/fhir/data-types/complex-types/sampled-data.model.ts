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
import { Quantity } from './quantity.model';

export class SampledData extends Element {
    // from Element: extension
    origin: Quantity; // R!  Zero value and units
    period: number; // R!  Number of milliseconds between samples
    factor: number; // Multiply data by this before adding to origin
    lowerLimit: number; // Lower limit of detection
    upperLimit: number; // Upper limit of detection
    dimensions: number; // R!  Number of sample points at each time point
    data: string; // R!  Decimal values with spaces, or "E" | "U" | "L"
}