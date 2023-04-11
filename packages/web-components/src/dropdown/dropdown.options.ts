import { ValuesOf } from '@microsoft/fast-foundation';

/**
 * DropdownAppearance - dropdown color defined by a design token alias.
 * @public
 */
export const DropdownAppearance = {
  strong: 'strong',
  brand: 'brand',
  subtle: 'subtle',
  default: 'default',
} as const;

/**
 * The types for Appearance
 * @public
 */
export type DropdownAppearance = ValuesOf<typeof DropdownAppearance>;
