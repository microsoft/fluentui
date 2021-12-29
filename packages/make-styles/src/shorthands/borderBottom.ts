import type { BorderColorProperty, BorderStyleProperty, BorderWidthProperty } from 'csstype';
import type { MakeStylesStrictCSSObject, MakeStylesCSSValue } from '../types';

type BorderBottomStyle = Pick<
  MakeStylesStrictCSSObject,
  'borderBottomWidth' | 'borderBottomStyle' | 'borderBottomColor'
>;

export function borderBottom(width: BorderWidthProperty<MakeStylesCSSValue>): BorderBottomStyle;
export function borderBottom(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
): BorderBottomStyle;
export function borderBottom(
  width: BorderWidthProperty<MakeStylesCSSValue>,
  style: BorderStyleProperty,
  color: BorderColorProperty,
): BorderBottomStyle;

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
): BorderBottomStyle {
  return {
    borderBottomWidth: values[0],
    ...(values[1] && ({ borderBottomStyle: values[1] } as BorderBottomStyle)),
    ...(values[2] && { borderBottomColor: values[2] }),
  };
}
