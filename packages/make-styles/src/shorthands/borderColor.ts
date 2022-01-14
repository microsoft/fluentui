import type { BorderColorProperty } from 'csstype';

import type { MakeStylesStrictCSSObject } from '../types';
import { generateStyles } from './generateStyles';

type BorderColorStyle = Pick<
  MakeStylesStrictCSSObject,
  'borderTopColor' | 'borderRightColor' | 'borderBottomColor' | 'borderLeftColor'
>;

export function borderColor(all: BorderColorProperty): BorderColorStyle;
export function borderColor(vertical: BorderColorProperty, horizontal: BorderColorProperty): BorderColorStyle;
export function borderColor(
  top: BorderColorProperty,
  horizontal: BorderColorProperty,
  bottom: BorderColorProperty,
): BorderColorStyle;
export function borderColor(
  top: BorderColorProperty,
  right: BorderColorProperty,
  bottom: BorderColorProperty,
  left: BorderColorProperty,
): BorderColorStyle;

/**
 * A function that implements CSS spec conformant expansion for "borderColor"
 *
 * @example
 *  borderColor('red')
 *  borderColor('red', 'blue')
 *  borderColor('red', 'blue', 'green')
 *  borderColor('red', 'blue', 'green', 'yellow')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-color
 */
export function borderColor(...values: BorderColorProperty[]): BorderColorStyle {
  return generateStyles('border', 'Color', ...values);
}
