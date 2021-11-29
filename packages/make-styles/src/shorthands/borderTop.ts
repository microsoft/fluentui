import type { BorderColorProperty, BorderStyleProperty, BorderWidthProperty } from 'csstype';
import type { MakeStylesStrictCSSObject, MakeStylesCSSValue } from '../types';

export function borderTop(width: BorderWidthProperty<MakeStylesCSSValue>): MakeStylesStrictCSSObject;
export function borderTop(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
): MakeStylesStrictCSSObject;
export function borderTop(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
  color: BorderColorProperty,
): MakeStylesStrictCSSObject;

/**
 * A function that implements expansion for "border-top", it's simplified - check usage examples.
 *
 * @example
 *  borderTop('2px')
 *  borderTop('2px', 'solid')
 *  borderTop('2px', 'solid', 'red')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-top
 */
export function borderTop(
  ...values: [BorderWidthProperty<MakeStylesCSSValue>, BorderStyleProperty?, BorderColorProperty?]
): MakeStylesStrictCSSObject {
  return {
    borderTopWidth: values[0],
    ...(values[1] && ({ borderTopStyle: values[1] } as MakeStylesStrictCSSObject)),
    ...(values[2] && { borderTopColor: values[2] }),
  };
}
