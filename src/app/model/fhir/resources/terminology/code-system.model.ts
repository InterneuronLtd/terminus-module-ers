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
import { CodeableConcept } from '../../data-types/complex-types/codeable-concept.model';
import { Identifier } from '../../data-types/complex-types/identifier.model';
import { DomainResource } from '../../base/domain-resource.model';
import { ContactDetail } from '../../data-types/metadata-types/contact-detail.model';
import { UsageContext } from '../../data-types/metadata-types/usage-context.model';

export class CodeSystem extends DomainResource {
    resourceType: string = "CodeSystem";
    // from Resource: id, meta, implicitRules, and language
    // from DomainResource: text, contained, extension, and modifierExtension
    url: string; // Canonical identifier for this code system, represented as a URI (globally unique) (Coding.system)
    identifier: Identifier; // Additional identifier for the code system (business identifier)
    version: string; // Business version of the code system (Coding.version)
    name: string; // C? Name for this code system (computer friendly)
    title: string; // Name for this code system (human friendly)
    status: string; // R!  draft | active | retired | unknown
    experimental: boolean; // For testing purposes, not real usage
    date: Date; // Date last changed
    publisher: string; // Name of the publisher (organization or individual)
    contact: ContactDetail[]; // Contact details for the publisher
    description: string; // Natural language description of the code system
    useContext: UsageContext[]; // The context that the content is intended to support
    jurisdiction: CodeableConcept[]; // Intended jurisdiction for code system (if applicable)
    purpose: string; // Why this code system is defined
    copyright: string; // Use and/or publishing restrictions
    caseSensitive: boolean; // If code comparison is case sensitive
    valueSet: string; // Canonical reference to the value set with entire code system
    hierarchyMeaning: string; // grouped-by | is-a | part-of | classified-with
    compositional: boolean; // If code system defines a compositional grammar
    versionNeeded: boolean; // If definitions are not stable
    //content: string; // R!  not-present | example | fragment | complete | supplement
    supplements: string; // Canonical URL of Code System this adds designations and properties to
    count: number; // Total concepts in the code system
    /*
    filter: [{ // Filter that can be used in a value set
      "code: "<code>", // R!  Code that identifies the filter
      "description: "<string>", // How or why the filter is used
      "operator: ["<code>"], // R!  = | is-a | descendent-of | is-not-a | regex | in | not-in | generalizes | exists
      "value: "<string>" // R!  What to use for the value
    }],
    "property: [{ // Additional information supplied about each concept
      "code: "<code>", // R!  Identifies the property on the concepts, and when referred to in operations
      "uri: "<uri>", // Formal identifier for the property
      "description: "<string>", // Why the property is defined, and/or what it conveys
      "type: "<code>" // R!  code | Coding | string | integer | boolean | dateTime | decimal
    }],
    "concept: [{ // Concepts in the code system
      "code: "<code>", // R!  Code that identifies concept
      "display: "<string>", // Text to display to the user
      "definition: "<string>", // Formal definition
      "designation: [{ // Additional representations for the concept
        "language: "<code>", // Human language of the designation
        "use: { Coding }, // Details how this designation would be used
        "value: "<string>" // R!  The text value for this designation
      }],
      "property: [{ // Property value for the concept
        "code: "<code>", // R!  Reference to CodeSystem.property.code
        // value[x]: Value of the property for this concept. One of these 7:
        "valueCode: "<code>"
        "valueCoding: { Coding }
        "valueString: "<string>"
        "valueInteger: <integer>
        "valueBoolean: <boolean>
        "valueDateTime: "<dateTime>"
        "valueDecimal: <decimal>
      }],
      "concept: [{ Content as for CodeSystem.concept }] // Child Concepts (is-a/contains/categorizes)
    }]*/
}