import type { BorderColorProperty, BorderStyleProperty, BorderWidthProperty } from 'csstype';
import type { MakeStylesStrictCSSObject, MakeStylesCSSValue } from '../types';

export function borderRight(width: BorderWidthProperty<MakeStylesCSSValue>): MakeStylesStrictCSSObject;
export function borderRight(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
): MakeStylesStrictCSSObject;
export function borderRight(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
  color: BorderColorProperty,
): MakeStylesStrictCSSObject;

/**
 * A function that implements expansion for "border-right", it's simplified - check usage examples.
 *
 * @example
 *  borderRight('2px')
 *  borderRight('2px', 'solid')
 *  borderRight('2px', 'solid', 'red')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-right
 */
export function borderRight(
  ...values: [BorderWidthProperty<MakeStylesCSSValue>, BorderStyleProperty?, BorderColorProperty?]
): MakeStylesStrictCSSObject {
  return {
    borderRightWidth: values[0],
    ...(values[1] && ({ borderRightStyle: values[1] } as MakeStylesStrictCSSObject)),
    ...(values[2] && { borderRightColor: values[2] }),
  };
}
