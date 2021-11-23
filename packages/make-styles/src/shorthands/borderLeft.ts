import type { BorderColorProperty, BorderStyleProperty, BorderWidthProperty } from 'csstype';
import type { MakeStyles, MakeStylesCSSValue } from '../types';

export function borderLeft(width: BorderWidthProperty<MakeStylesCSSValue>): MakeStyles;
export function borderLeft(width: BorderWidthProperty<MakeStylesCSSValue>, style: BorderStyleProperty): MakeStyles;
export function borderLeft(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
  color: BorderColorProperty,
): MakeStyles;

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
): MakeStyles {
  return {
    borderLeftWidth: values[0],
    ...(values[1] && ({ borderLeftStyle: values[1] } as MakeStyles)),
    ...(values[2] && ({ borderLeftColor: values[2] } as MakeStyles)),
  };
}
