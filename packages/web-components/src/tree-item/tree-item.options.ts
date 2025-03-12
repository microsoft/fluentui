import { ValuesOf } from '../utils/typings.js';

export const TreeItemAppearance = {
  subtle: 'subtle',
  subtleAlpha: 'subtle-alpha',
  transparent: 'transparent',
} as const;

export type TreeItemAppearance = ValuesOf<typeof TreeItemAppearance>;

export const TreeItemSize = {
  small: 'small',
  medium: 'medium',
} as const;

export type TreeItemSize = ValuesOf<typeof TreeItemSize>;
