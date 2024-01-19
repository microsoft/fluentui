import { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
/**
 * DropdownAppearance - dropdown appearance defined by css.
 * @public
 */
export const DropdownAppearance = {
  outline: 'outline',
  underline: 'underline',
  filledDarker: 'filled-darker',
  filledLighter: 'filled-lighter',
} as const;

/**
 * The types for Appearance
 * @public
 */
export type DropdownAppearance = ValuesOf<typeof DropdownAppearance>;

/**
 * DropdownSizes - dropdown size defined by css.
 * @public
 */
export const DropdownControlSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * The types for styleSizes
 * @public
 */
export type DropdownControlSize = ValuesOf<typeof DropdownControlSize>;
