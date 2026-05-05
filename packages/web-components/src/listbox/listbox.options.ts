import { FluentDesignSystem } from '../fluent-design-system.js';
import type { Listbox } from './listbox.js';

/**
 * Predicate function that determines if the element should be considered a listbox.
 *
 * @param element - The element to check.
 * @param tagName - The tag name to check.
 * @returns true if the element is a listbox.
 * @public
 */
export function isListbox(element?: Node | null, tagName: string = '-listbox'): element is Listbox {
  if (element?.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return (element as Element).tagName.toLowerCase().endsWith(tagName);
}

/**
 * The tag name for the listbox element.
 *
 * @public
 */
export const tagName = `${FluentDesignSystem.prefix}-listbox` as const;
