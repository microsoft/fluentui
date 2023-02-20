import { getDocument } from './getDocument';
import { getWindow } from './getWindow';

/**
 * Placing this attribute on scrollable divs optimizes detection to know
 * if the div is scrollable or not (given we can avoid expensive operations
 * like getComputedStyle.)
 *
 * @public
 */
export const DATA_IS_SCROLLABLE_ATTRIBUTE = 'data-is-scrollable';

/**
 * Traverses up the DOM for the element with the data-is-scrollable=true attribute, or returns
 * document.body.
 *
 * @public
 */
export function findScrollableParent(startingElement: HTMLElement | null): HTMLElement | Window | undefined | null {
  let el: HTMLElement | Window | undefined | null = startingElement;
  const doc = getDocument(startingElement)!;

  // First do a quick scan for the scrollable attribute.
  while (el && el !== doc.body) {
    if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) === 'true') {
      return el;
    }
    el = el.parentElement;
  }

  // If we haven't found it, the use the slower method: compute styles to evaluate if overflow is set.
  el = startingElement;

  while (el && el !== doc.body) {
    if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) !== 'false') {
      const computedStyles = getComputedStyle(el);
      const overflowY = computedStyles ? computedStyles.getPropertyValue('overflow-y') : '';

      if (overflowY && (overflowY === 'scroll' || overflowY === 'auto')) {
        return el;
      }
    }

    el = el.parentElement;
  }

  // Fall back to window scroll.
  if (!el || el === doc.body) {
    el = getWindow(startingElement);
  }

  return el;
}
