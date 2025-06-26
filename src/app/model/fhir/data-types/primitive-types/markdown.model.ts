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
 * A string that may contain Github Flavored Markdown syntax for optional processing by a mark down presentation engine
 */
export class markdownType extends Type<string> {
	private static regexExp = /^[ \r\n\t\S]+$/;

	// readonly _tag: 'markdownType' = 'markdownType';

	constructor() {
		super(
			/** a unique name for this codec */

			'markdownType',
			/** a custom type guard */

			(m): m is string =>
				typeof m === 'string' && markdownType.regexExp.test(m.toString()),
			/** succeeds if a value of type I can be decoded to a value of type A */

			(m, c) => (this.is(m) ? success(m) : failure(m, c)),
			/** converts a value of type A to a value of type O */
			identity
		);
	}
}

export const markdown = new markdownType();