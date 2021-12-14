import type { BorderWidthProperty } from 'csstype';

import type { MakeStylesStrictCSSObject, MakeStylesCSSValue } from '../types';
import { generateStyles } from './generateStyles';

type BorderWidthStyle = Pick<
  MakeStylesStrictCSSObject,
  'borderTopStyle' | 'borderRightStyle' | 'borderBottomStyle' | 'borderLeftStyle'
>;

export function borderWidth(all: BorderWidthProperty<MakeStylesCSSValue>): BorderWidthStyle;
export function borderWidth(
  vertical: BorderWidthProperty<MakeStylesCSSValue>,
  horizontal: BorderWidthProperty<MakeStylesCSSValue>,
): BorderWidthStyle;
export function borderWidth(
  top: BorderWidthProperty<MakeStylesCSSValue>,
  horizontal: BorderWidthProperty<MakeStylesCSSValue>,
  bottom: BorderWidthProperty<MakeStylesCSSValue>,
): BorderWidthStyle;
export function borderWidth(
  top: BorderWidthProperty<MakeStylesCSSValue>,
  right: BorderWidthProperty<MakeStylesCSSValue>,
  bottom: BorderWidthProperty<MakeStylesCSSValue>,
  left: BorderWidthProperty<MakeStylesCSSValue>,
): BorderWidthStyle;

/**
 * A function that implements CSS spec conformant expansion for "borderWidth"
 *
 * @example
 *   borderWidth('10px')
 *   borderWidth('10px', '5px')
 *   borderWidth('2px', '4px', '8px')
 *   borderWidth('1px', 0, '3px', '4px')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-width
 */
export function borderWidth(...values: BorderWidthProperty<MakeStylesCSSValue>[]): BorderWidthStyle {
  return generateStyles('border', 'Width', ...values);
}
