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

/**
 * DropdownSizes - dropdown size defined by css.
 * @public
 */
export const DropdownControlSizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * The types for styleSizes
 * @public
 */
export type DropdownControlSizes = ValuesOf<typeof DropdownControlSizes>;
