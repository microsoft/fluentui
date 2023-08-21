import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
export { SliderOrientation } from '@microsoft/fast-foundation/slider.js';

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
