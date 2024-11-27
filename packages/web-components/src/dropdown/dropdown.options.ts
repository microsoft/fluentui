import type { ValuesOf } from '../utils/typings.js';
import type { Dropdown } from './dropdown.js';

/**
 * Predicate function that determines if the element should be considered a dropdown.
 *
 * @param element - The element to check.
 * @param tagName - The tag name to check.
 * @returns true if the element is a dropdown.
 * @public
 */
export function isDropdown(element?: Node | null, tagName: string = '-dropdown'): element is Dropdown {
  if (element?.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return (element as Element).tagName.toLowerCase().endsWith(tagName);
}

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
