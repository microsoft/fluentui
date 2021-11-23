import type { BorderColorProperty, BorderStyleProperty, BorderWidthProperty } from 'csstype';
import type { MakeStyles, MakeStylesCSSValue } from '../types';

export function borderRight(width: BorderWidthProperty<MakeStylesCSSValue>): MakeStyles;
export function borderRight(width: BorderWidthProperty<MakeStylesCSSValue>, style: BorderStyleProperty): MakeStyles;
export function borderRight(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
  color: BorderColorProperty,
): MakeStyles;

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
): MakeStyles {
  return {
    borderRightWidth: values[0],
    ...(values[1] && ({ borderRightStyle: values[1] } as MakeStyles)),
    ...(values[2] && ({ borderRightColor: values[2] } as MakeStyles)),
  };
}
