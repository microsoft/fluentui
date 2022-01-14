import type { MakeStylesStrictCSSObject, MakeStylesCSSValue } from '../types';
import { generateStyles } from './generateStyles';

type MarginStyle = Pick<MakeStylesStrictCSSObject, 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft'>;

export function margin(all: MakeStylesCSSValue): MarginStyle;
export function margin(vertical: MakeStylesCSSValue, horizontal: MakeStylesCSSValue): MarginStyle;
export function margin(
  top: MakeStylesCSSValue,
  horizontal: MakeStylesCSSValue,
  bottom: MakeStylesCSSValue,
): MarginStyle;
export function margin(
  top: MakeStylesCSSValue,
  right: MakeStylesCSSValue,
  bottom: MakeStylesCSSValue,
  left: MakeStylesCSSValue,
): MarginStyle;

/**
 * A function that implements CSS spec conformant expansion for "margin"
 *
 * @example
 *   margin('10px')
 *   margin('10px', '5px')
 *   margin('2px', '4px', '8px')
 *   margin('1px', 0, '3px', '4px')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/margin
 */
export function margin(...values: MakeStylesCSSValue[]): MarginStyle {
  return generateStyles('margin', '', ...values);
}
