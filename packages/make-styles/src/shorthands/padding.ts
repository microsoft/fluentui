import type { MakeStylesStrictCSSObject, MakeStylesCSSValue } from '../types';
import { generateStyles } from './generateStyles';

type PaddingStyle = Pick<MakeStylesStrictCSSObject, 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft'>;

export function padding(all: MakeStylesCSSValue): PaddingStyle;
export function padding(vertical: MakeStylesCSSValue, horizontal: MakeStylesCSSValue): PaddingStyle;
export function padding(
  top: MakeStylesCSSValue,
  horizontal: MakeStylesCSSValue,
  bottom: MakeStylesCSSValue,
): PaddingStyle;
export function padding(
  top: MakeStylesCSSValue,
  right: MakeStylesCSSValue,
  bottom: MakeStylesCSSValue,
  left: MakeStylesCSSValue,
): PaddingStyle;

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
export function padding(...values: MakeStylesCSSValue[]): PaddingStyle {
  return generateStyles('padding', '', ...values);
}
