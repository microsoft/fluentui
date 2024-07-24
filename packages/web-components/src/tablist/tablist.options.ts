import { Orientation } from '@microsoft/fast-web-utilities';
import type { ValuesOf } from '../utils/index.js';

export const TablistAppearance = {
  subtle: 'subtle',
  transparent: 'transparent',
} as const;

export type TablistAppearance = ValuesOf<typeof TablistAppearance>;

export const TablistSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type TablistSize = ValuesOf<typeof TablistSize>;

/**
 * The orientation of the component
 * @public
 */
export const TablistOrientation = Orientation;

/**
 * The types for the Tablist component
 * @public
 */
export type TablistOrientation = ValuesOf<typeof TablistOrientation>;
