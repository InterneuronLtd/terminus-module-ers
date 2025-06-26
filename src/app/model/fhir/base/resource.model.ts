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
import { Meta } from '../data-types/special-purpose-data-types/meta.model';
import { Identifier } from '../data-types/complex-types/identifier.model';
import { uriType } from '../data-types/primitive-types/uri.model';
import { codeType } from '../data-types/primitive-types/code.model';

export class Resource {
    id?: string;
    meta?: Meta;
    implicitRules?: uriType;
    language?: codeType;
}