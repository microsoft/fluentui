import { ValuesOf } from '@microsoft/fast-foundation';

/**
 * DropdownAppearance - dropdown appearance defined by css.
 * @public
 */
export const DropdownAppearance = {
  outline: 'outline',
  underline: 'underline',
  subtle: 'filled-darker',
  default: 'filled-lighter',
} as const;

/**
 * The types for Appearance
 * @public
 */
export type DropdownAppearance = ValuesOf<typeof DropdownAppearance>;
