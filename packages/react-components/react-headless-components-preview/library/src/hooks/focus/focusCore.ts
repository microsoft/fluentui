'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { isHTMLElement } from '@fluentui/react-utilities';
import { isFollowing, isPreceding } from './focusFinders';

/**
 * Marks a container that keeps Tab / Shift+Tab cycling inside it.
 */
export const FOCUS_TRAP_ATTRIBUTE = 'data-fui-focus-trap';

/**
 * Marks a focusable group; the value is its Tab behavior (`unlimited`, `limited`, `limited-trap-focus`).
 */
export const FOCUSABLE_GROUP_ATTRIBUTE = 'data-fui-focusable-group';

export const TRAP_SELECTOR = `[${FOCUS_TRAP_ATTRIBUTE}]`;
export const GROUP_SELECTOR = `[${FOCUSABLE_GROUP_ATTRIBUTE}]`;
// Popovers and dialogs rendered inline own their keyboard handling, even inside a trap or a group.
export const LAYER_SELECTOR = 'dialog, [popover]';

export const isLimitedGroup = (group: HTMLElement): boolean =>
  group.getAttribute(FOCUSABLE_GROUP_ATTRIBUTE) === 'limited' ||
  group.getAttribute(FOCUSABLE_GROUP_ATTRIBUTE) === 'limited-trap-focus';

/**
 * Returns the closest ancestor (or self) matching `selector`, unless an inline popover or dialog sits between
 * `element` and that ancestor: content of a layer is governed by the layer itself.
 */
export const closestInLayer = (element: HTMLElement, selector: string): HTMLElement | null => {
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
export const isReachable = (element: HTMLElement, activeElement: HTMLElement): boolean => {
  let group = element.parentElement?.closest<HTMLElement>(GROUP_SELECTOR);
  while (group) {
    if (isLimitedGroup(group) && !(group !== activeElement && group.contains(activeElement))) {
      return false;
    }
    group = group.parentElement?.closest<HTMLElement>(GROUP_SELECTOR);
  }

  return true;
};

// `candidates` are in native Tab order. When `current` is not one of them (e.g. focus sits on a non-tabbable
// element), fall back to DOM order: descendants follow their focusable container and ancestors precede them.
export const pickSibling = (
  candidates: HTMLElement[],
  current: HTMLElement,
  backward: boolean,
): HTMLElement | undefined => {
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
 * Keyboard and focus handlers a feature (focus trap, focusable group) contributes to the shared document
 * listeners. Features only bundle the handlers they use.
 */
export type FocusHandlers = {
  /** Handlers with a higher priority run first. */
  priority?: number;
  /** Returns `true` when it took care of the Tab press, which skips the remaining handlers. */
  tab?: (event: KeyboardEvent, activeElement: HTMLElement) => boolean;
  enter?: (event: KeyboardEvent, activeElement: HTMLElement) => void;
  /** Called for focus moves caused by a Tab press. */
  tabFocusIn?: (event: FocusEvent, target: HTMLElement) => void;
};

type FocusManagerEntry = { handlers: Map<FocusHandlers, number>; dispose: () => void };

const managers = new WeakMap<Document, FocusManagerEntry>();

const createFocusManager = (targetDocument: Document): FocusManagerEntry => {
  const win = targetDocument.defaultView;
  const handlers = new Map<FocusHandlers, number>();
  let tabPending = false;

  const sortedHandlers = () => [...handlers.keys()].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

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
      sortedHandlers().some(handler => handler.tab?.(event, activeElement));
    }
  };

  // Enter runs in the capture phase so that a group consumes it before its content activates.
  const onKeyDownCapture = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const activeElement = getActiveElement(event);
    if (activeElement) {
      handlers.forEach((_, handler) => handler.enter?.(event, activeElement));
    }
  };

  const onFocusIn = (event: FocusEvent) => {
    // `composedPath()[0]` is the focused element even inside an open shadow root.
    const target = event.composedPath()[0];
    if (tabPending && isHTMLElement(target)) {
      handlers.forEach((_, handler) => handler.tabFocusIn?.(event, target));
    }
  };

  targetDocument.addEventListener('keydown', onKeyDown);
  targetDocument.addEventListener('keydown', onKeyDownCapture, true);
  targetDocument.addEventListener('focusin', onFocusIn);

  return {
    handlers,
    dispose: () => {
      targetDocument.removeEventListener('keydown', onKeyDown);
      targetDocument.removeEventListener('keydown', onKeyDownCapture, true);
      targetDocument.removeEventListener('focusin', onFocusIn);
    },
  };
};

/**
 * Installs `handlers` on the shared document listeners for as long as the calling component is mounted.
 * `handlers` must be a module level constant.
 */
export const useFocusHandlers = (handlers: FocusHandlers): void => {
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
    const current = entry;
    current.handlers.set(handlers, (current.handlers.get(handlers) ?? 0) + 1);

    return () => {
      const count = (current.handlers.get(handlers) ?? 1) - 1;
      if (count > 0) {
        current.handlers.set(handlers, count);
        return;
      }

      current.handlers.delete(handlers);
      if (current.handlers.size === 0) {
        current.dispose();
        managers.delete(targetDocument);
      }
    };
  }, [targetDocument, handlers]);
};
