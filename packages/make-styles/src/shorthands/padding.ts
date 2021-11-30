import type { MakeStylesStrictCSSObject, MakeStylesCSSValue } from '../types';
import { generateStyles } from './generateStyles';

export function padding(all: MakeStylesCSSValue): MakeStylesStrictCSSObject;
export function padding(vertical: MakeStylesCSSValue, horizontal: MakeStylesCSSValue): MakeStylesStrictCSSObject;
export function padding(
  top: MakeStylesCSSValue,
  horizontal: MakeStylesCSSValue,
  bottom: MakeStylesCSSValue,
): MakeStylesStrictCSSObject;
export function padding(
  top: MakeStylesCSSValue,
  right: MakeStylesCSSValue,
  bottom: MakeStylesCSSValue,
  left: MakeStylesCSSValue,
): MakeStylesStrictCSSObject;

/**
 * A function that implements CSS spec conformant expansion for "padding"
 *
 * @example
 *   padding('10px')
 *   padding('10px', '5px')
 *   padding('2px', '4px', '8px')
 *   padding('1px', 0, '3px', '4px')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/padding
 */
export function padding(...values: MakeStylesCSSValue[]): MakeStylesStrictCSSObject {
  return generateStyles('padding', '', ...values);
}
