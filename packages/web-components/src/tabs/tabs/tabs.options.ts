import { ValuesOf } from '@microsoft/fast-foundation';

export const TabListAppearance = {
  subtle: 'subtle',
  transparent: 'transparent',
} as const;

export type TabListAppearance = ValuesOf<typeof TabListAppearance>;

export const TabListSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type TabListSize = ValuesOf<typeof TabListSize>;

export const TabListOrientation = {
  vertical: 'vertical',
  horizontal: 'horizontal',
} as const;

export type TabListOrientation = ValuesOf<typeof TabListOrientation>;

export interface TabData {
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
}
