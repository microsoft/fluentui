/**
 * Check whether an element's content is overflowing
 *
 * @param element Element to check for overflow
 * @returns True if element's content overflows
 */
export function isElementOverflowing(element: HTMLElement): boolean {
  return element.clientWidth < element.scrollWidth;
}