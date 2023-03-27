import { ValuesOf } from '@microsoft/fast-foundation';
export { SliderOrientation } from '@microsoft/fast-foundation';

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
