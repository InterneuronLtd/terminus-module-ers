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
import { Type, success, failure, identity } from 'io-ts';

/**
 * A date or partial date (e.g. just year or year + month). There is no time zone. The format is a union of the schema types gYear, gYearMonth and date.  Dates SHALL be valid dates.
 */
export class dateType extends Type<string> {
	private static regexExp = /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?$/;

	// readonly _tag: 'dateType' = 'dateType';

	constructor() {
		super(
			/** a unique name for this codec */

			'dateType',
			/** a custom type guard */

			(m): m is string =>
				typeof m === 'string' && dateType.regexExp.test(m.toString()),
			/** succeeds if a value of type I can be decoded to a value of type A */

			(m, c) => (this.is(m) ? success(m) : failure(m, c)),
			/** converts a value of type A to a value of type O */
			identity
		);
	}
}

export const date = new dateType();