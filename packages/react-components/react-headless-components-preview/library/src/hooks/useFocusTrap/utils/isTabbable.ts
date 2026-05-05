import { getTabIndex } from './getTabIndex';
import { isFocusable } from './isFocusable';

/**
 * Predicate: is the element reachable via Tab key navigation?
 * A tabbable element is focusable AND has either no `tabindex` or a non-negative `tabindex`.
 */
export function isTabbable(element: HTMLElement): boolean {
  const tabIndex = getTabIndex(element);
  return (Number.isNaN(tabIndex) || tabIndex >= 0) && isFocusable(element);
}
