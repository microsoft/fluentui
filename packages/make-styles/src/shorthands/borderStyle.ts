import type { BorderStyleProperty } from 'csstype';

import type { MakeStyles } from '../types';
import { generateStyles } from './generateStyles';

export function borderStyle(all: BorderStyleProperty): MakeStyles;
export function borderStyle(vertical: BorderStyleProperty, horizontal: BorderStyleProperty): MakeStyles;
export function borderStyle(
  top: BorderStyleProperty,
  horizontal: BorderStyleProperty,
  bottom: BorderStyleProperty,
): MakeStyles;
export function borderStyle(
  top: BorderStyleProperty,
  right: BorderStyleProperty,
  bottom: BorderStyleProperty,
  left: BorderStyleProperty,
): MakeStyles;

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
export function borderStyle(...values: BorderStyleProperty[]): MakeStyles {
  return generateStyles('border', 'Style', ...values);
}
