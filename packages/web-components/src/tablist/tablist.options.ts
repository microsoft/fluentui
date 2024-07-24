import { Orientation } from '@microsoft/fast-web-utilities';
import type { ValuesOf } from '../utils/index.js';

/**
 * The appearance of the component
 * @public
 */
export const TablistAppearance = {
  subtle: 'subtle',
  transparent: 'transparent',
} as const;

/**
 * The types for the Tablist appearance
 * @public
 */
export type TablistAppearance = ValuesOf<typeof TablistAppearance>;

/**
 * The size of the component
 * @public
 */
export const TablistSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * The types for the Tablist size
 * @public
 */
export type TablistSize = ValuesOf<typeof TablistSize>;

/**
 * The orientation of the component
 * @public
 */
export const TablistOrientation = Orientation;

/**
 * The types for the Tablist orientation
 * @public
 */
export type TablistOrientation = ValuesOf<typeof TablistOrientation>;
