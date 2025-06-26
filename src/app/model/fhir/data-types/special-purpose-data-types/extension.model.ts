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
import { Address } from '../../data-types/complex-types/address.model';
import { Annotation } from '../../data-types/complex-types/annotation.model';
import { Attachment } from '../../data-types/complex-types/attachment.model';
import { CodeableConcept } from '../../data-types/complex-types/codeable-concept.model';
import { Coding } from '../../data-types/complex-types/coding.model';
import { ContactPoint } from '../../data-types/complex-types/contact-point.model';
import { HumanName } from '../../data-types/complex-types/human-name.model';
import { Identifier } from '../../data-types/complex-types/identifier.model';
import { Meta } from './meta.model';
import { Period } from '../../data-types/complex-types/period.model';
import { Quantity } from '../../data-types/complex-types/quantity.model';
import { Range } from '../../data-types/complex-types/range.model';
import { Ratio } from '../../data-types/complex-types/ratio.model';
import { Reference } from './reference.model';
import { SampledData } from '../../data-types/complex-types/sampled-data.model';
import { Signature } from '../../data-types/complex-types/signature.model';
import { Timing } from '../../data-types/complex-types/timing.model';
import { Element } from '../../base/element.model';

export class Extension extends Element {
    url: string;
    // value[x]: Value of extension. One of these 23:
    valueInteger: number;
    valueUnsignedInt : number;
    valuePositiveInt : number;
    valueDecimal: number;
    valueDateTime: Date;
    valueDate: Date;
    valueTime : Date;
    valueInstant: Date;
    valueString: string;
    valueUri: string;
    valueOid : string;
    valueUuid : string;
    valueId : string;
    valueBoolean: boolean;
    valueCode: string;
    valueMarkdown: string;
    valueBase64Binary: string;
    valueCoding: Coding;
    valueCodeableConcept: CodeableConcept;
    valueAttachment: Attachment;
    valueIdentifier: Identifier;
    valueQuantity: Quantity;
    valueSampledData : SampledData;
    valueRange: Range;
    valuePeriod: Period;
    valueRatio: Ratio;
    valueHumanName: HumanName;
    valueAddress: Address;
    valueContactPoint: ContactPoint;    
    valueTiming : Timing;
    valueReference: Reference;
    valueAnnotation: Annotation;
    valueSignature: Signature;
    valueMeta : Meta;
}