import type { BorderStyleProperty } from 'csstype';

import type { MakeStylesStrictCSSObject } from '../types';
import { generateStyles } from './generateStyles';

export function borderStyle(all: BorderStyleProperty): MakeStylesStrictCSSObject;
export function borderStyle(vertical: BorderStyleProperty, horizontal: BorderStyleProperty): MakeStylesStrictCSSObject;
export function borderStyle(
  top: BorderStyleProperty,
  horizontal: BorderStyleProperty,
  bottom: BorderStyleProperty,
): MakeStylesStrictCSSObject;
export function borderStyle(
  top: BorderStyleProperty,
  right: BorderStyleProperty,
  bottom: BorderStyleProperty,
  left: BorderStyleProperty,
): MakeStylesStrictCSSObject;

/**
 * A function that implements CSS spec conformant expansion for "borderStyle"
 *
 * @example
 *  borderStyle('solid')
 *  borderStyle('solid', 'dashed')
 *  borderStyle('solid', 'dashed', 'dotted')
 *  borderStyle('solid', 'dashed', 'dotted', 'double')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-style
 */
export function borderStyle(...values: BorderStyleProperty[]): MakeStylesStrictCSSObject {
  return generateStyles('border', 'Style', ...values);
}
