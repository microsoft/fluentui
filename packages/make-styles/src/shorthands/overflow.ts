import type { OverflowProperty } from 'csstype';
import type { MakeStylesStrictCSSObject } from '../types';

type OverflowStyles = Pick<MakeStylesStrictCSSObject, 'overflowX' | 'overflowY'>;

/**
 * A function that implements CSS spec conformant expansion for "overflow"
 *
 * @example
 *   overflow('hidden')
 *   overflow('hidden', 'scroll')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
 */
export function overflow(overflowX: OverflowProperty, overflowY: OverflowProperty = overflowX): OverflowStyles {
  return {
    overflowX,
    overflowY,
  } as OverflowStyles;
}
