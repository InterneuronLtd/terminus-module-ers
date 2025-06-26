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
import { BackboneElement } from '../../base/backbone-element.model';
import { CodeableConcept } from '../../data-types/complex-types/codeable-concept.model';
import { codeType } from '../../data-types/primitive-types/code.model';
import { Reference } from '../../data-types/special-purpose-data-types/reference.model';

export class AppointmentParticipant extends BackboneElement {
    // from Element: id, extension
    // from BackboneElement: modifierExtension
    type?: CodeableConcept; // Role of participant in the appointment
    actor: Reference; //(Patient|Practitioner|RelatedPerson|Device|HealthcareService|Location) }, // Person, Location/HealthcareService or Device
    required?: codeType; // required | optional | information-only
    status: codeType; // R!  accepted | declined | tentative | needs-action
}