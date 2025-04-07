import type { StartOptions } from '../patterns/start-end.js';
import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
import type { DropdownOption } from './option.js';

/**
 * Predicate function that determines if the element should be considered an option.
 *
 * @param element - The element to check.
 * @param tagName - The tag name to check.
 * @returns true if the element is an option.
 * @public
 */
export function isDropdownOption(value: Node | null, tagName: string = '-option'): value is DropdownOption {
  if (value?.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return (value as Element).tagName.toLowerCase().endsWith(tagName);
}

/**
 * The options for the {@link DropdownOption} component.
 *
 * @public
 */
export type DropdownOptionOptions = StartOptions<DropdownOption> & {
  checkedIndicator?: StaticallyComposableHTML<DropdownOption>;
};
