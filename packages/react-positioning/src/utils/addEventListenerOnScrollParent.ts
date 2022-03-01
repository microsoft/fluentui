import { PopperVirtualElement } from '../types';
import { getScrollParent } from './getScrollParent';

export function addEventListenerOnScrollParent(
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
