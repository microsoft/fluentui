import type { MakeStylesStrictCSSObject, MakeStylesCSSValue } from '../types';

type GapStyle = Pick<MakeStylesStrictCSSObject, 'columnGap' | 'rowGap'>;

/**
 * A function that implements CSS spec conformant expansion for "gap"
 *
 * @example
 *   gap('10px')
 *   gap('10px', '5px')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/gap
 */
export function gap(columnGap: MakeStylesCSSValue, rowGap: MakeStylesCSSValue = columnGap): GapStyle {
  return {
    columnGap,
    rowGap,
  };
}
