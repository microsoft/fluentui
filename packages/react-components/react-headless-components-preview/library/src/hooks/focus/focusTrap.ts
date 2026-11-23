import { closestInLayer, isReachable, pickSibling, TRAP_SELECTOR } from './focusCore';
import type { FocusHandlers } from './focusCore';
import { findAllTabbable } from './focusFinders';

/**
 * Keeps Tab / Shift+Tab cycling inside the closest focus trap. Content of unentered limited groups inside the
 * trap is skipped; entered trapped groups are handled by the focusable group handlers, which run first.
 */
const handleTrapTab = (event: KeyboardEvent, activeElement: HTMLElement): boolean => {
  const trap = closestInLayer(activeElement, TRAP_SELECTOR);
  if (!trap) {
    return false;
  }

  const nativeSequence = findAllTabbable(trap);
  const sequence = nativeSequence.filter(element => isReachable(element, activeElement));

  let next = pickSibling(sequence, activeElement, event.shiftKey);
  const wrapped = !next;
  if (wrapped) {
    next = event.shiftKey ? sequence[sequence.length - 1] : sequence[0];
  }

  if (!wrapped && next === pickSibling(nativeSequence, activeElement, event.shiftKey)) {
    // The browser's own Tab handling already lands on the right element.
    return true;
  }

  // With nothing to cycle to, keep focus inside the trap.
  event.preventDefault();
  next?.focus();
  return true;
};

export const trapHandlers: FocusHandlers = { tab: handleTrapTab };
