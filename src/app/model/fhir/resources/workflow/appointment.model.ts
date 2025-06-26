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
import { DomainResource } from '../../base/domain-resource.model';
import { CodeableConcept } from '../../data-types/complex-types/codeable-concept.model';
import { codeType } from '../../data-types/primitive-types/code.model';
import { instantType } from '../../data-types/primitive-types/instant.model';
import { AppointmentParticipant } from './appointment-participant.model';

export class Appointment extends DomainResource {
    resourceType: string = "Appointment";
    // from Resource: id, meta, implicitRules, and language
    // from DomainResource: text, contained, extension, and modifierExtension
    status: codeType; // R!  proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error
    start: instantType; // When appointment is to take place
    end: instantType; // When appointment is to conclude
    participant: AppointmentParticipant[]; //Participants involved in appointment
}