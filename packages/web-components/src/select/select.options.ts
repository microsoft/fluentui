import { ValuesOf } from '@microsoft/fast-foundation';

/**
 * SliderSize Constants
 * @public
 */
export const SelectSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * Applies height to the slider based on the size attribute
 * @public
 */
export type SelectSize = ValuesOf<typeof SelectSize>;
