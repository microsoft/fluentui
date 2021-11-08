import type { BorderColorProperty, BorderStyleProperty, BorderWidthProperty } from 'csstype';
import type { MakeStylesStrictCSSObject, MakeStylesCSSValue } from '../types';

type Created = Pick<MakeStylesStrictCSSObject, 'borderTopWidth' | 'borderTopStyle' | 'borderTopColor'>;

export function borderTop(width: BorderWidthProperty<MakeStylesCSSValue>): Created;
export function borderTop(width: BorderWidthProperty<MakeStylesCSSValue>, style: BorderStyleProperty): Created;
export function borderTop(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
  color: BorderColorProperty,
): Created;

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
): Created {
  return {
    borderTopWidth: values[0],
    ...(values[1] && ({ borderTopStyle: values[1] } as Created)),
    ...(values[2] && { borderTopColor: values[2] }),
  };
}
