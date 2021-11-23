import type { BorderColorProperty, BorderStyleProperty, BorderWidthProperty } from 'csstype';
import type { MakeStyles, MakeStylesCSSValue } from '../types';

export function borderTop(width: BorderWidthProperty<MakeStylesCSSValue>): MakeStyles;
export function borderTop(width: BorderWidthProperty<MakeStylesCSSValue>, style: BorderStyleProperty): MakeStyles;
export function borderTop(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
  color: BorderColorProperty,
): MakeStyles;

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
): MakeStyles {
  return {
    borderTopWidth: values[0],
    ...(values[1] && ({ borderTopStyle: values[1] } as MakeStyles)),
    ...(values[2] && ({ borderTopColor: values[2] } as MakeStyles)),
  };
}
