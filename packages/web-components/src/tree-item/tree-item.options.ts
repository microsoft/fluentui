import { ValuesOf } from "../utils/typings.js";


export const treeItemAppearance = {
  subtle: 'subtle',
  subtleAlpha: 'subtle-alpha',
  transparent: 'transparent',
} as const;

export type TreeItemAppearance = ValuesOf<typeof treeItemAppearance>;

export const treeItemSize = {
  small: 'small',
  medium: 'medium',
} as const;

export type TreeItemSize = ValuesOf<typeof treeItemSize>;
