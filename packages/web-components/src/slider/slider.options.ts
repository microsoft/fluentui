import { ValuesOf } from '@microsoft/fast-foundation';

/**
 * SliderSize Constants
 * @public
 */
export const SliderSize = {
  small: 'small',
  medium: 'medium',
} as const;

/**
 * Applies bar height to the slider rail and diameter to the slider thumbs
 * @public
 */
export type SliderSize = ValuesOf<typeof SliderSize>;

/**
 * SliderMode Constants
 * @public
 */
export const SliderMode = {
  range: 'range',
  singleValue: 'single-value',
} as const;

/**
 * Determines if the slider is intended for a specific or range of values
 * @public
 */
export type SliderMode = ValuesOf<typeof SliderMode>;
