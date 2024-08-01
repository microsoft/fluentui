import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
import type { ValuesOf } from '../utils/typings.js';
import type { Dropdown } from './dropdown.js';

export type DropdownOptions = {
  indicator?: StaticallyComposableHTML<Dropdown>;
};

/**
 * Dropdown size
 * @public
 */
export const DropdownSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/** @public */
export type DropdownSize = ValuesOf<typeof DropdownSize>;

/**
 * Dropdown appearance
 * @public
 */
export const DropdownAppearance = {
  filled: 'filled',
  filledDarker: 'filled-darker',
  filledLighter: 'filled-lighter',
  outline: 'outline',
  transparent: 'transparent',
} as const;

/** @public */
export type DropdownAppearance = ValuesOf<typeof DropdownAppearance>;
