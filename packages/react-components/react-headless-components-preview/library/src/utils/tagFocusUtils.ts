import { findAllFocusable } from '../hooks/focus/focusFinders';

/**
 * Moves focus to the last focusable element within the tag group container.
 * Does nothing when the container is empty or contains no focusable tags.
 */
export function focusLastTag(container: HTMLElement): void {
  const focusable = findAllFocusable(container);
  focusable[focusable.length - 1]?.focus();
}

/**
 * Returns `true` when `target` is the last focusable element within the tag
 * group container; `false` otherwise (including when the container is empty).
 */
export function isLastFocusableTag(container: HTMLElement, target: HTMLElement): boolean {
  const focusable = findAllFocusable(container);
  return focusable.length > 0 && focusable[focusable.length - 1] === target;
}
