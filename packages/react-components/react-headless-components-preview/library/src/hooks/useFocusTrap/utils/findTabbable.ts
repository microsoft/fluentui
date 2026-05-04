import { FOCUS_SELECTOR } from '../constants';
import { isTabbable } from './isTabbable';

/**
 * Returns the first tabbable descendant of `container`, or `null` if none exists.
 */
export function findTabbable(container: HTMLElement): HTMLElement | null {
  const candidates = Array.from(container.querySelectorAll<HTMLElement>(FOCUS_SELECTOR));
  return candidates.find(isTabbable) ?? null;
}

/**
 * Returns every tabbable descendant of `container` in document order.
 */
export function findAllTabbable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUS_SELECTOR)).filter(isTabbable);
}
