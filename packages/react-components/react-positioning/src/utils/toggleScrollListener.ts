import { isHTMLElement } from '@fluentui/react-utilities';
import type { PositioningVirtualElement } from '../types';
import { getScrollParent } from './getScrollParent';

/**
 * Toggles event listeners for scroll parent.
 * Cleans up the event listeners for the previous element and adds them for the new scroll parent.
 * @param next Next element
 * @param prev Previous element
 */
export function toggleScrollListener(
  next: HTMLElement | PositioningVirtualElement | null,
  prev: HTMLElement | PositioningVirtualElement | null,
  handler: EventListener,
) {
  if (next === prev) {
    return;
  }

  if (isHTMLElement(prev)) {
    const prevScrollParent = getScrollParent(prev);
    prevScrollParent.removeEventListener('scroll', handler);
  }
  if (isHTMLElement(next)) {
    const scrollParent = getScrollParent(next);
    scrollParent.addEventListener('scroll', handler);
  }
}
