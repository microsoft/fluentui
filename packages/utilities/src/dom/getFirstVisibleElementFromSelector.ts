import { isElementVisibleAndNotHidden } from '../focus';
import { getDocument } from './getDocument';

/**
 * Gets the first visible element that matches the given selector
 * @param selector - The selector to use to find potential visible elements
 * @returns The first visible element that matches the selector, otherwise undefined
 *
 * @public
 */
export function getFirstVisibleElementFromSelector(selector: string): Element | undefined {
  const doc = getDocument()!;
  const elements = doc.querySelectorAll(selector);

  // Iterate across the elements that match the selector and return the first visible/non-hidden element
  return Array.from(elements).find((element: HTMLElement) =>
    isElementVisibleAndNotHidden(element, doc.defaultView ?? undefined),
  );
}
