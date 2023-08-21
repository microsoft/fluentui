import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
import { TabsOrientation } from '@microsoft/fast-foundation/tabs.js';

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

export { TabsOrientation };
