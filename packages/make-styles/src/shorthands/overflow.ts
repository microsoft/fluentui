import type { OverflowProperty } from 'csstype';
import type { MakeStyles } from '../types';

/**
 * A function that implements CSS spec conformant expansion for "overflow"
 *
 * @example
 *   overflow('hidden')
 *   overflow('hidden', 'scroll')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
 */
export function overflow(overflowX: OverflowProperty, overflowY: OverflowProperty = overflowX): MakeStyles {
  return {
    overflowX,
    overflowY,
  } as MakeStyles;
}
