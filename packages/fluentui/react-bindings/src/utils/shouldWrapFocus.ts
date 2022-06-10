import { elementContainsAttribute } from '@fluentui/dom-utilities';

/**
 * Determines if an, or any of its ancestors, sepcificies that it doesn't want focus to wrap
 * @param element - element to start searching from
 * @param noWrapDataAttribute - the no wrap data attribute to match (either)
 * @returns true if focus should wrap, false otherwise
 */
export function shouldWrapFocus(
  element: HTMLElement,
  noWrapDataAttribute: 'data-no-vertical-wrap' | 'data-no-horizontal-wrap',
): boolean {
  return elementContainsAttribute(element, noWrapDataAttribute) !== 'true';
}
