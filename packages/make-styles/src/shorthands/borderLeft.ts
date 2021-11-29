import type { BorderColorProperty, BorderStyleProperty, BorderWidthProperty } from 'csstype';
import type { MakeStylesStrictCSSObject, MakeStylesCSSValue } from '../types';

export function borderLeft(width: BorderWidthProperty<MakeStylesCSSValue>): MakeStylesStrictCSSObject;
export function borderLeft(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
): MakeStylesStrictCSSObject;
export function borderLeft(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
  color: BorderColorProperty,
): MakeStylesStrictCSSObject;

/**
 * A function that implements expansion for "border-left", it's simplified - check usage examples.
 *
 * @example
 *  borderLeft('2px')
 *  borderLeft('2px', 'solid')
 *  borderLeft('2px', 'solid', 'red')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-left
 */
export function borderLeft(
  ...values: [BorderWidthProperty<MakeStylesCSSValue>, BorderStyleProperty?, BorderColorProperty?]
): MakeStylesStrictCSSObject {
  return {
    borderLeftWidth: values[0],
    ...(values[1] && ({ borderLeftStyle: values[1] } as MakeStylesStrictCSSObject)),
    ...(values[2] && { borderLeftColor: values[2] }),
  };
}
