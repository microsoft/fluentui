import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
import type { Option } from './option.js';

/**
 * Determines if the element is an {@link Option}.
 *
 * @param value - The element to check.
 * @param tagName - The tag name to check.
 * @returns true if the element is an option.
 * @public
 */
export function isOption(value: Node | null, tagName: string = '-option'): value is Option {
  if (value?.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return (value as Element).tagName.toLowerCase().endsWith(tagName);
}

/**
 * The options for the {@link Option} component.
 *
 * @public
 */
export type OptionOptions = {
  checkedIndicator?: StaticallyComposableHTML<Option>;
};
