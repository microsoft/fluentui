import { findAllTabbable } from './utils';

/**
 * Wraps Tab navigation when focus reaches the boundary of `node`.
 *
 * - Tab on the last tabbable → focus the first.
 * - Shift+Tab on the first tabbable → focus the last.
 * - Otherwise, leaves the keyboard event alone and lets the browser handle it.
 *
 * If `node` contains no tabbable descendants, the Tab event is suppressed so
 * focus cannot escape the trap.
 */
export function cycleTabFocus(node: HTMLElement, event: KeyboardEvent): void {
  const tabbables = findAllTabbable(node);
  if (!tabbables.length) {
    event.preventDefault();
    return;
  }

  const boundary = tabbables[event.shiftKey ? 0 : tabbables.length - 1];
  const root = node.getRootNode() as Document | ShadowRoot;
  const atBoundary = boundary === root.activeElement || node === root.activeElement;

  if (!atBoundary) {
    return;
  }

  event.preventDefault();
  const target = tabbables[event.shiftKey ? tabbables.length - 1 : 0];
  target?.focus();
}
