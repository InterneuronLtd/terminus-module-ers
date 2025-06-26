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
import { CodeableConcept } from './codeable-concept.model';
import { Period } from './period.model';
import { Range } from './range.model';

export class Timing extends Element {
    resourceType: string =  "Timing";
    // from Element: extension
    event: Date[]; // When the event occurs
    repeat: { // When the event is to occur
      // bounds[x]: Length/Range of lengths, or (Start and/or end) limits. One of these 3:
      boundsDuration: string; // TODO: Check datatype
      boundsRange: Range,
      boundsPeriod: Period,
      count: number; // Number of times to repeat
      countMax: number; // Maximum number of times to repeat
      duration: number; // How long when it happens
      durationMax: number; // How long when it happens (Max)
      durationUnit: string; // s | min | h | d | wk | mo | a - unit of time (UCUM)
      frequency: number; // Event occurs frequency times per period
      frequencyMax: number; // Event occurs up to frequencyMax times per period
      period: number; // Event occurs frequency times per period
      periodMax: number; // Upper limit of period (3-4 hours)
      periodUnit: string; // s | min | h | d | wk | mo | a - unit of time (UCUM)
      dayOfWeek: string[]; // mon | tue | wed | thu | fri | sat | sun
      timeOfDay: string[]; // Time of day for action
      when: string[]; // Regular life events the event is tied to
      offset: number; // Minutes from event (before or after)
    };
    code: CodeableConcept; // BID | TID | QID | AM | PM | QD | QOD | Q4H | Q6H +
  }