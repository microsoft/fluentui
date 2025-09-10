import type { Tab } from './tab.js';

/**
 * Predicate function that determines if the element should be considered a tab.
 *
 * @param element - The element to check.
 * @param tagName - The tag name to check.
 * @returns true if the element is a tab.
 * @public
 */
export function isTab(element?: Node | null, tagName: string = '-tab'): element is Tab {
  if (element?.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return (element as Element).tagName.toLowerCase().endsWith(tagName);
}
