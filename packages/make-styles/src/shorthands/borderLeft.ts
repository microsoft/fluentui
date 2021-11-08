import type { BorderColorProperty, BorderStyleProperty, BorderWidthProperty } from 'csstype';
import type { MakeStylesStrictCSSObject, MakeStylesCSSValue } from '../types';

type BorderLeftStyles = Pick<MakeStylesStrictCSSObject, 'borderLeftColor' | 'borderLeftStyle' | 'borderLeftWidth'>;

export function borderLeft(width: BorderWidthProperty<MakeStylesCSSValue>): BorderLeftStyles;
export function borderLeft(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
): BorderLeftStyles;
export function borderLeft(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
  color: BorderColorProperty,
): BorderLeftStyles;

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
): BorderLeftStyles {
  return {
    borderLeftWidth: values[0],
    ...(values[1] && ({ borderLeftStyle: values[1] } as MakeStylesStrictCSSObject)),
    ...(values[2] && { borderLeftColor: values[2] }),
  };
}
