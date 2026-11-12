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

/**
 * Space separated list of keys (`Tab`, `Enter`, `Escape`) the focusable group must not handle.
 */
export const FOCUSABLE_GROUP_IGNORE_ATTRIBUTE = 'data-fui-focusable-group-ignore';

const TRAP_SELECTOR = `[${FOCUS_TRAP_ATTRIBUTE}]`;
const GROUP_SELECTOR = `[${FOCUSABLE_GROUP_ATTRIBUTE}]`;
// Popovers and dialogs rendered inline own their keyboard handling, even inside a trap or a group.
const LAYER_SELECTOR = 'dialog, [popover]';

const isLimitedGroup = (group: HTMLElement): boolean =>
  group.getAttribute(FOCUSABLE_GROUP_ATTRIBUTE) === 'limited' ||
  group.getAttribute(FOCUSABLE_GROUP_ATTRIBUTE) === 'limited-trap-focus';

const isTrappedGroup = (group: HTMLElement): boolean =>
  group.getAttribute(FOCUSABLE_GROUP_ATTRIBUTE) === 'limited-trap-focus';

const ignoresKey = (group: HTMLElement, key: string): boolean =>
  (group.getAttribute(FOCUSABLE_GROUP_IGNORE_ATTRIBUTE) ?? '').split(' ').includes(key);

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

// `candidates` are in native Tab order. When `current` is not one of them (e.g. focus sits on a non-tabbable
// element), fall back to DOM order: descendants follow their focusable container and ancestors precede them.
const pickSibling = (candidates: HTMLElement[], current: HTMLElement, backward: boolean): HTMLElement | undefined => {
  const index = candidates.indexOf(current);
  if (index !== -1) {
    return candidates[index + (backward ? -1 : 1)];
  }

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

/**
 * Takes `elements` out of the native Tab order until the browser has moved focus for the current Tab press.
 */
const skipOnce = (elements: HTMLElement[]): void => {
  const restore = elements.map(element => {
    const tabIndex = element.getAttribute('tabindex');
    element.setAttribute('tabindex', '-1');
    return () => (tabIndex === null ? element.removeAttribute('tabindex') : element.setAttribute('tabindex', tabIndex));
  });
  elements[0]?.ownerDocument.defaultView?.setTimeout(() => restore.forEach(fn => fn()));
};

const handleTab = (event: KeyboardEvent, activeElement: HTMLElement): void => {
  const trap = closestInLayer(activeElement, TRAP_SELECTOR);
  const group = closestInLayer(activeElement, GROUP_SELECTOR);

  if (!trap && !group) {
    return;
  }

  if (group && ignoresKey(group, 'Tab')) {
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
  } else {
    // Nothing reachable is left on the page, but the browser would still move into the content of a limited
    // group. Hide that content for this Tab press so focus leaves the page instead.
    skipOnce(nativeSequence.filter(element => !sequence.includes(element)));
  }
};

const handleEnter = (event: KeyboardEvent, activeElement: HTMLElement): void => {
  if (!activeElement.hasAttribute(FOCUSABLE_GROUP_ATTRIBUTE) || ignoresKey(activeElement, 'Enter')) {
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

/**
 * Escape inside a focusable group moves focus back to the group. It runs as the group's own `onKeyDown`, so
 * descendants (e.g. a composite list item returning focus to its row) handle Escape first, and an inner group
 * consumes it before an outer group or an ancestor dialog sees it.
 */
export const handleGroupEscape = (event: React.KeyboardEvent<HTMLElement>): void => {
  if (
    event.key !== 'Escape' ||
    event.isDefaultPrevented() ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  ) {
    return;
  }

  const group = event.currentTarget;
  const target = event.target;
  if (
    !isHTMLElement(target) ||
    target === group ||
    ignoresKey(group, 'Escape') ||
    !group.hasAttribute('tabindex') ||
    // Content of an inline popover or dialog inside the group is governed by that layer.
    target.closest(LAYER_SELECTOR) !== group.closest(LAYER_SELECTOR) ||
    // An expanded control (combobox, menu button, ...) closes its popup first.
    target.getAttribute('aria-expanded') === 'true'
  ) {
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
    // Follow focus into open shadow roots: the document only reports their host.
    let activeElement = targetDocument.activeElement;
    while (activeElement?.shadowRoot?.activeElement) {
      activeElement = activeElement.shadowRoot.activeElement;
    }
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

  // Enter runs in the capture phase so that a group consumes it before its content activates.
  const onKeyDownCapture = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const activeElement = getActiveElement(event);
    if (activeElement) {
      handleEnter(event, activeElement);
    }
  };

  // Shift+Tab from after a limited group lands on its last item natively; redirect to the group itself.
  const onFocusIn = (event: FocusEvent) => {
    // `composedPath()[0]` is the focused element even inside an open shadow root.
    const target = event.composedPath()[0];
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
