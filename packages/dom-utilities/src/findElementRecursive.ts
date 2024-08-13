import { getParent } from './getParent';
/**
 * Finds the first parent element where the matchFunction returns true
 * @param element - element to start searching at
 * @param matchFunction - the function that determines if the element is a match
 * @returns the matched element or null no match was found
 */
export function findElementRecursive(
  element: HTMLElement | null,
  matchFunction: (element: HTMLElement) => boolean,
  doc?: Document,
): HTMLElement | null {
  // eslint-disable-next-line no-restricted-globals
  doc ??= document;
  if (!element || element === doc.body) {
    return null;
  }
  return matchFunction(element) ? element : findElementRecursive(getParent(element), matchFunction);
}
