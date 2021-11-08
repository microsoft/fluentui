import type { BorderColorProperty } from 'csstype';

import type { MakeStylesStrictCSSObject } from '../types';
import { generateStyles } from './generateStyles';

type BorderColorStyles = Pick<
  MakeStylesStrictCSSObject,
  'borderTopColor' | 'borderRightColor' | 'borderBottomColor' | 'borderLeftColor'
>;

export function borderColor(all: BorderColorProperty): BorderColorStyles;
export function borderColor(vertical: BorderColorProperty, horizontal: BorderColorProperty): BorderColorStyles;
export function borderColor(
  top: BorderColorProperty,
  horizontal: BorderColorProperty,
  bottom: BorderColorProperty,
): BorderColorStyles;
export function borderColor(
  top: BorderColorProperty,
  right: BorderColorProperty,
  bottom: BorderColorProperty,
  left: BorderColorProperty,
): BorderColorStyles;

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
export function borderColor(...values: BorderColorProperty[]): BorderColorStyles {
  return generateStyles('border', 'Color', ...values);
}
