import type { PopperVirtualElement } from '../types';
import { getScrollParent } from './getScrollParent';

/**
 * Toggles event listeners for scroll parent.
 * Cleans up the event listeners for the previous element and adds them for the new scroll parent.
 * @param next Next element
 * @param prev Previous element
 */
export function toggleScrollListener(
  next: HTMLElement | PopperVirtualElement | null,
  prev: HTMLElement | PopperVirtualElement | null,
  handler: EventListener,
) {
  if (next === prev) {
    return;
  }

  if (prev instanceof HTMLElement) {
    const prevScrollParent = getScrollParent(prev);
    prevScrollParent.removeEventListener('scroll', handler);
  }
  if (next instanceof HTMLElement) {
    const scrollParent = getScrollParent(next);
    scrollParent.addEventListener('scroll', handler);
  }
}
