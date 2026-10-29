'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { isHTMLElement } from '@fluentui/react-utilities';
import { findAllTabbable, isFollowing, isPreceding } from './focusFinders';

/**
 * Marks a container that keeps Tab / Shift+Tab cycling inside it.
 */
export const FOCUS_TRAP_ATTRIBUTE = 'data-fui-focus-trap';

/**
 * Marks a focusable group; the value is its Tab behavior (`unlimited`, `limited`, `limited-trap-focus`).
 */
export const FOCUSABLE_GROUP_ATTRIBUTE = 'data-fui-focusable-group';

const TRAP_SELECTOR = `[${FOCUS_TRAP_ATTRIBUTE}]`;
const GROUP_SELECTOR = `[${FOCUSABLE_GROUP_ATTRIBUTE}]`;
// Popovers and dialogs rendered inline own their keyboard handling, even inside a trap or a group.
const LAYER_SELECTOR = 'dialog, [popover]';

const isLimitedGroup = (group: HTMLElement): boolean =>
  group.getAttribute(FOCUSABLE_GROUP_ATTRIBUTE) === 'limited' ||
  group.getAttribute(FOCUSABLE_GROUP_ATTRIBUTE) === 'limited-trap-focus';

const isTrappedGroup = (group: HTMLElement): boolean =>
  group.getAttribute(FOCUSABLE_GROUP_ATTRIBUTE) === 'limited-trap-focus';

/**
 * Returns the closest ancestor (or self) matching `selector`, unless an inline popover or dialog sits between
 * `element` and that ancestor: content of a layer is governed by the layer itself.
 */
const closestInLayer = (element: HTMLElement, selector: string): HTMLElement | null => {
  const match = element.closest<HTMLElement>(selector);
  const layer = element.closest<HTMLElement>(LAYER_SELECTOR);
  if (match && layer && layer !== match && match.contains(layer)) {
    return null;
  }

  return match;
};

/**
 * A group is "entered" while focus is on one of its descendants. Limited groups hide their content from the
 * Tab sequence until entered.
 */
const isReachable = (element: HTMLElement, activeElement: HTMLElement): boolean => {
  let group = element.parentElement?.closest<HTMLElement>(GROUP_SELECTOR);
  while (group) {
    if (isLimitedGroup(group) && !(group !== activeElement && group.contains(activeElement))) {
      return false;
    }
    group = group.parentElement?.closest<HTMLElement>(GROUP_SELECTOR);
  }

  return true;
};

/**
 * Whether `element` is reachable once `group` is entered, i.e. no limited group between them hides it.
 */
const isReachableWithin = (element: HTMLElement, group: HTMLElement): boolean => {
  let current = element.parentElement?.closest<HTMLElement>(GROUP_SELECTOR);
  while (current && current !== group) {
    if (isLimitedGroup(current)) {
      return false;
    }
    current = current.parentElement?.closest<HTMLElement>(GROUP_SELECTOR);
  }

  return true;
};

const getModalScope = (element: HTMLElement): HTMLElement => {
  const dialog = element.closest('dialog');
  try {
    if (dialog?.matches(':modal')) {
      return dialog;
    }
  } catch {
    // `:modal` is not supported, fall back to the document.
  }

  return element.ownerDocument.body;
};

// Tab order follows DOM order: descendants follow their focusable container and ancestors precede them.
const pickSibling = (candidates: HTMLElement[], current: HTMLElement, backward: boolean): HTMLElement | undefined => {
  if (backward) {
    for (let i = candidates.length - 1; i >= 0; i--) {
      if (isPreceding(current, candidates[i])) {
        return candidates[i];
      }
    }
    return undefined;
  }

  return candidates.find(candidate => isFollowing(current, candidate));
};

const handleTab = (event: KeyboardEvent, activeElement: HTMLElement): void => {
  const trap = closestInLayer(activeElement, TRAP_SELECTOR);
  const group = closestInLayer(activeElement, GROUP_SELECTOR);

  if (!trap && !group) {
    return;
  }

  // The innermost entered trapped group wins over a trap container.
  let trappedGroup: HTMLElement | null = null;
  for (let current = group; current; current = current.parentElement?.closest<HTMLElement>(GROUP_SELECTOR) ?? null) {
    if (trap && !trap.contains(current)) {
      break;
    }
    if (current !== activeElement && isTrappedGroup(current)) {
      trappedGroup = current;
      break;
    }
  }

  const wrap = !!(trappedGroup || trap);
  const scope = trappedGroup ?? trap ?? getModalScope(activeElement);
  const nativeSequence = findAllTabbable(scope).filter(element => element !== trappedGroup);
  const sequence = nativeSequence.filter(element => isReachable(element, activeElement));

  let next = pickSibling(sequence, activeElement, event.shiftKey);
  const wrapped = !next && wrap;
  if (wrapped) {
    next = event.shiftKey ? sequence[sequence.length - 1] : sequence[0];
  }

  if (!wrapped && next === pickSibling(nativeSequence, activeElement, event.shiftKey)) {
    // The browser's own Tab handling already lands on the right element.
    return;
  }

  if (next) {
    event.preventDefault();
    next.focus();
  } else if (wrap) {
    // Nothing to cycle to: keep focus inside the trap.
    event.preventDefault();
  }
};

const handleEnter = (event: KeyboardEvent, activeElement: HTMLElement): void => {
  if (!activeElement.hasAttribute(FOCUSABLE_GROUP_ATTRIBUTE)) {
    return;
  }

  // Enter moves focus inside the group, onto the first element reachable once the group is entered.
  const first = findAllTabbable(activeElement).find(
    element => element !== activeElement && isReachableWithin(element, activeElement),
  );
  if (first) {
    event.preventDefault();
    first.focus();
  }
};

const handleEscape = (event: KeyboardEvent, activeElement: HTMLElement): void => {
  const group = closestInLayer(activeElement, GROUP_SELECTOR);
  if (!group || group === activeElement) {
    return;
  }

  // An expanded control (combobox, menu button, ...) closes its popup first.
  if (activeElement.getAttribute('aria-expanded') === 'true' || !group.hasAttribute('tabindex')) {
    return;
  }

  event.preventDefault();
  group.focus();
};

type FocusManagerEntry = { refCount: number; dispose: () => void };

const managers = new WeakMap<Document, FocusManagerEntry>();

const createFocusManager = (targetDocument: Document): FocusManagerEntry => {
  const win = targetDocument.defaultView;
  let tabPending = false;

  const getActiveElement = (event: Event): HTMLElement | null => {
    if (event.defaultPrevented) {
      return null;
    }
    const activeElement = targetDocument.activeElement;
    return isHTMLElement(activeElement) ? activeElement : null;
  };

  // Tab runs in the bubble phase so components can handle Tab themselves first.
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    // The browser moves focus right after keydown dispatch, so the flag only covers that focus change.
    tabPending = true;
    win?.setTimeout(() => {
      tabPending = false;
    });

    const activeElement = getActiveElement(event);
    if (activeElement) {
      handleTab(event, activeElement);
    }
  };

  // Enter and Escape run in the capture phase so that a group consumes them before its ancestors (e.g. a
  // dialog closing on Escape) see them.
  const onKeyDownCapture = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const activeElement = event.key === 'Enter' || event.key === 'Escape' ? getActiveElement(event) : null;
    if (!activeElement) {
      return;
    }

    if (event.key === 'Enter') {
      handleEnter(event, activeElement);
    } else {
      handleEscape(event, activeElement);
    }
  };

  // Shift+Tab from after a limited group lands on its last item natively; redirect to the group itself.
  const onFocusIn = (event: FocusEvent) => {
    const target = event.target;
    if (!tabPending || !isHTMLElement(target)) {
      return;
    }

    const relatedTarget = event.relatedTarget as Node | null;
    let group = target.parentElement?.closest<HTMLElement>(GROUP_SELECTOR);
    let outermostUnentered: HTMLElement | null = null;
    while (group) {
      // Coming from the group itself or its content means the group was entered on purpose.
      if (isLimitedGroup(group) && !(relatedTarget && group.contains(relatedTarget))) {
        outermostUnentered = group;
      }
      group = group.parentElement?.closest<HTMLElement>(GROUP_SELECTOR);
    }

    if (outermostUnentered && outermostUnentered !== target) {
      outermostUnentered.focus();
    }
  };

  targetDocument.addEventListener('keydown', onKeyDown);
  targetDocument.addEventListener('keydown', onKeyDownCapture, true);
  targetDocument.addEventListener('focusin', onFocusIn);

  return {
    refCount: 0,
    dispose: () => {
      targetDocument.removeEventListener('keydown', onKeyDown);
      targetDocument.removeEventListener('keydown', onKeyDownCapture, true);
      targetDocument.removeEventListener('focusin', onFocusIn);
    },
  };
};

/**
 * Installs the document level listeners that implement focus traps and focusable groups for as long as the
 * calling component is mounted.
 */
export const useFocusManager = (): void => {
  const { targetDocument } = useFluent();

  React.useEffect(() => {
    if (!targetDocument) {
      return;
    }

    let entry = managers.get(targetDocument);
    if (!entry) {
      entry = createFocusManager(targetDocument);
      managers.set(targetDocument, entry);
    }
    entry.refCount++;
    const current = entry;

    return () => {
      if (--current.refCount === 0) {
        current.dispose();
        managers.delete(targetDocument);
      }
    };
  }, [targetDocument]);
};
