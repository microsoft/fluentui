import type { BorderColorProperty, BorderStyleProperty, BorderWidthProperty } from 'csstype';

import type { MakeStylesStrictCSSObject, MakeStylesCSSValue } from '../types';
import { borderWidth } from './borderWidth';
import { borderStyle } from './borderStyle';
import { borderColor } from './borderColor';

export function border(width: BorderWidthProperty<MakeStylesCSSValue>): MakeStylesStrictCSSObject;
export function border(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
): MakeStylesStrictCSSObject;
export function border(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
  color: BorderColorProperty,
): MakeStylesStrictCSSObject;

/**
 * A function that implements expansion for "border" to all sides of an element, it's simplified - check usage examples.
 *
 * @example
 *  border('2px')
 *  border('2px', 'solid')
 *  border('2px', 'solid', 'red')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border
 */
export function border(
  ...values: [BorderWidthProperty<MakeStylesCSSValue>, BorderStyleProperty?, BorderColorProperty?]
): MakeStylesStrictCSSObject {
  return {
    ...borderWidth(values[0]),
    ...(values[1] && borderStyle(values[1])),
    ...(values[2] && borderColor(values[2])),
  };
}
