import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
import type { ValuesOf } from '../utils/typings.js';
import type { BaseDropdown } from './dropdown.base.js';

/**
 * Predicate function that determines if the element should be considered a dropdown.
 *
 * @param element - The element to check.
 * @param tagName - The tag name to check.
 * @returns true if the element is a dropdown.
 * @public
 */
export function isDropdown(element?: Node | null, tagName: string = '-dropdown'): element is BaseDropdown {
  if (element?.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return (element as Element).tagName.toLowerCase().endsWith(tagName);
}

/**
 * Values for the `appearance` attribute of the {@link (Dropdown:class)} component.
 * @public
 */
export const DropdownAppearance = {
  filledDarker: 'filled-darker',
  filledLighter: 'filled-lighter',
  outline: 'outline',
  transparent: 'transparent',
};

/** @public */
export type DropdownAppearance = ValuesOf<typeof DropdownAppearance>;

/**
 * Template options for the {@link (Dropdown:class)} component.
 * @public
 */
export type DropdownOptions = {
  indicator?: StaticallyComposableHTML<BaseDropdown>;
};

/**
 * Values for the `size` attribute of the {@link (Dropdown:class)} component.
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
 * Values  for the `type` attribute of the {@link (Dropdown:class)} component.
 * @public
 */
export const DropdownType = {
  combobox: 'combobox',
  dropdown: 'dropdown',
  select: 'select',
} as const;

/** @public */
export type DropdownType = ValuesOf<typeof DropdownType>;
