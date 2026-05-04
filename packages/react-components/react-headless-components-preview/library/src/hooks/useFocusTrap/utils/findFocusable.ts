import { FOCUS_SELECTOR } from '../constants';
import { isFocusable } from './isFocusable';

/**
 * Returns the first focusable descendant of `container`, or `null` if none exists.
 */
export function findFocusable(container: HTMLElement): HTMLElement | null {
  const candidates = Array.from(container.querySelectorAll<HTMLElement>(FOCUS_SELECTOR));
  return candidates.find(isFocusable) ?? null;
}
