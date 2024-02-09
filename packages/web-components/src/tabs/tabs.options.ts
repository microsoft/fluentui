import { Orientation } from '@microsoft/fast-web-utilities';
import { StartEndOptions } from '../patterns/index.js';
import type { ValuesOf } from '../utils/index.js';
import { Tabs } from './tabs.js';

export const TabsAppearance = {
  subtle: 'subtle',
  transparent: 'transparent',
} as const;

export type TabsAppearance = ValuesOf<typeof TabsAppearance>;

export const TabsSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type TabsSize = ValuesOf<typeof TabsSize>;

/**
 * Tabs option configuration options
 * @public
 */
export type TabsOptions = StartEndOptions<Tabs>;

/**
 * The orientation of the component
 * @public
 */
export const TabsOrientation = Orientation;

/**
 * The types for the Tabs component
 * @public
 */
export type TabsOrientation = ValuesOf<typeof TabsOrientation>;
