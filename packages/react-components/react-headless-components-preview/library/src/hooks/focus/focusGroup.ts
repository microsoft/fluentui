import type * as React from 'react';
import { isHTMLElement } from '@fluentui/react-utilities';
import {
  closestInLayer,
  FOCUSABLE_GROUP_ATTRIBUTE,
  GROUP_SELECTOR,
  isLimitedGroup,
  isReachable,
  LAYER_SELECTOR,
  pickSibling,
  TRAP_SELECTOR,
} from './focusCore';
import type { FocusHandlers } from './focusCore';
import { findAllTabbable } from './focusFinders';

/**
 * Space separated list of keys (`Tab`, `Enter`, `Escape`) the focusable group must not handle.
 */
export const FOCUSABLE_GROUP_IGNORE_ATTRIBUTE = 'data-fui-focusable-group-ignore';

const isTrappedGroup = (group: HTMLElement): boolean =>
  group.getAttribute(FOCUSABLE_GROUP_ATTRIBUTE) === 'limited-trap-focus';

const ignoresKey = (group: HTMLElement, key: string): boolean =>
  (group.getAttribute(FOCUSABLE_GROUP_IGNORE_ATTRIBUTE) ?? '').split(' ').includes(key);

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

const handleGroupTab = (event: KeyboardEvent, activeElement: HTMLElement): boolean => {
  const group = closestInLayer(activeElement, GROUP_SELECTOR);
  if (!group) {
    return false;
  }

  if (ignoresKey(group, 'Tab')) {
    return true;
  }

  const trap = closestInLayer(activeElement, TRAP_SELECTOR);

  // The innermost entered trapped group wins over a trap container.
  let trappedGroup: HTMLElement | null = null;
  for (
    let current: HTMLElement | null = group;
    current;
    current = current.parentElement?.closest(GROUP_SELECTOR) ?? null
  ) {
    if (trap && !trap.contains(current)) {
      break;
    }
    if (current !== activeElement && isTrappedGroup(current)) {
      trappedGroup = current;
      break;
    }
  }

  if (!trappedGroup && trap) {
    // The focus trap skips unentered limited groups itself.
    return false;
  }

  const scope = trappedGroup ?? getModalScope(activeElement);
  const nativeSequence = findAllTabbable(scope).filter(element => element !== trappedGroup);
  const sequence = nativeSequence.filter(element => isReachable(element, activeElement));

  let next = pickSibling(sequence, activeElement, event.shiftKey);
  const wrapped = !next && !!trappedGroup;
  if (wrapped) {
    next = event.shiftKey ? sequence[sequence.length - 1] : sequence[0];
  }

  if (!wrapped && next === pickSibling(nativeSequence, activeElement, event.shiftKey)) {
    // The browser's own Tab handling already lands on the right element.
    return true;
  }

  if (next) {
    event.preventDefault();
    next.focus();
  } else if (trappedGroup) {
    // Nothing to cycle to: keep focus inside the group.
    event.preventDefault();
  } else {
    // Nothing reachable is left on the page, but the browser would still move into the content of a limited
    // group. Hide that content for this Tab press so focus leaves the page instead.
    skipOnce(nativeSequence.filter(element => !sequence.includes(element)));
  }
  return true;
};

const handleGroupEnter = (event: KeyboardEvent, activeElement: HTMLElement): void => {
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

// Shift+Tab from after a limited group lands on its last item natively; redirect to the group itself.
const handleGroupTabFocusIn = (event: FocusEvent, target: HTMLElement): void => {
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

// Groups run before the focus trap: an entered trapped group inside a trap keeps Tab to itself.
export const groupHandlers: FocusHandlers = {
  priority: 1,
  tab: handleGroupTab,
  enter: handleGroupEnter,
  tabFocusIn: handleGroupTabFocusIn,
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
