import { findElementRecursive } from './findElementRecursive';
/**
 * Determines if an element, or any of its ancestors, contain the given attribute
 * @param element - element to start searching at
 * @param attribute - the attribute to search for
 * @returns the value of the first instance found
 */
export function elementContainsAttribute(element: HTMLElement, attribute: string): string | null {
  let elementMatch = findElementRecursive(element, (testElement: HTMLElement) => testElement.hasAttribute(attribute));
  return elementMatch && elementMatch.getAttribute(attribute);
}
