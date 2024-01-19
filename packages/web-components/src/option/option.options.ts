import { ValuesOf } from '@microsoft/fast-foundation/utilities.js';

/**
 * OptionAppearance - option color defined by a design token alias.
 * @public
 */
export const OptionAppearance = {
  strong: 'strong',
  brand: 'brand',
  subtle: 'subtle',
  default: 'default',
} as const;

/**
 * The types for Appearance
 * @public
 */
export type OptionAppearance = ValuesOf<typeof OptionAppearance>;
