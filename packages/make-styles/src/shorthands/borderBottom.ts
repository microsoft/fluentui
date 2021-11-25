import type { BorderColorProperty, BorderStyleProperty, BorderWidthProperty } from 'csstype';
import type { MakeStyles, MakeStylesCSSValue } from '../types';

export function borderBottom(width: BorderWidthProperty<MakeStylesCSSValue>): MakeStyles;
export function borderBottom(width: BorderWidthProperty<MakeStylesCSSValue>, style: BorderStyleProperty): MakeStyles;
export function borderBottom(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
  color: BorderColorProperty,
): MakeStyles;

/**
 * A function that implements expansion for "border-bottom", it's simplified - check usage examples.
 *
 * @example
 *  borderBottom('2px')
 *  borderBottom('2px', 'solid')
 *  borderBottom('2px', 'solid', 'red')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom
 */
export function borderBottom(
  ...values: [BorderWidthProperty<MakeStylesCSSValue>, BorderStyleProperty?, BorderColorProperty?]
): MakeStyles {
  return {
    borderBottomWidth: values[0],
    ...(values[1] && ({ borderBottomStyle: values[1] } as MakeStyles)),
    ...(values[2] && ({ borderBottomColor: values[2] } as MakeStyles)),
  };
}
