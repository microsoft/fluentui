import type { MakeStyles, MakeStylesCSSValue } from '../types';
import { generateStyles } from './generateStyles';

export function padding(all: MakeStylesCSSValue): MakeStyles;
export function padding(vertical: MakeStylesCSSValue, horizontal: MakeStylesCSSValue): MakeStyles;
export function padding(
  top: MakeStylesCSSValue,
  horizontal: MakeStylesCSSValue,
  bottom: MakeStylesCSSValue,
): MakeStyles;
export function padding(
  top: MakeStylesCSSValue,
  right: MakeStylesCSSValue,
  bottom: MakeStylesCSSValue,
  left: MakeStylesCSSValue,
): MakeStyles;

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
export function padding(...values: MakeStylesCSSValue[]): MakeStyles {
  return generateStyles('padding', '', ...values);
}
