/**
 * NavigationManager — central event delegation replacing the tabster library.
 *
 * One instance is created per Document (ref-counted). It registers exactly
 * one set of listeners on the document and dispatches behaviour based on
 * `data-tabster` JSON attributes found on container elements.
 *
 * Responsibilities:
 *   - Arrow key navigation (Mover)
 *   - Tab-key grouping with roving tabindex (Groupper)
 *   - Modal focus trapping + aria-hidden (Modalizer)
 *   - Focus restoration (Restorer)
 *   - Observed element registry (focus by name)
 *   - Focused element subscriptions
 */

import { isHTMLElement } from '@fluentui/react-utilities';
import { getNavConfig, findAncestorWithNavKey, TABSTER_ATTRIBUTE_NAME, type MoverDirection } from './types';
import { findAll, findFirst, findLast, findNext, findPrev, findNextInColumn } from './focusableFinder';
import {
  MoverMoveFocusEventName,
  MoverMemorizedElementEvent,
  GroupperMoveFocusEventName,
  GroupperMoveFocusActions,
  TabsterMoveFocusEvent,
  type MoverKey,
  type GroupperMoveFocusAction,
} from './navigationEvents';
import {
  markNextFocusProgrammatic,
  consumeProgrammaticFocusFlag,
  createKeyboardDetector,
  disposeKeyboardDetector,
  type KeyboardDetector,
} from './keyboardDetector';

// ---------------------------------------------------------------------------
// Public API types
// ---------------------------------------------------------------------------

export type FocusedElementCallback = (
  element: HTMLElement | undefined,
  detail: { relatedTarget?: HTMLElement | null; isFocusedProgrammatically?: boolean },
) => void;

export type ObservedRequest = {
  result: Promise<boolean>;
  cancel: () => void;
};

export type NavigationManager = {
  /** Register an element under one or more observable names. Returns unregister fn. */
  registerObservedElement: (element: HTMLElement, names: string[]) => () => void;
  /** Focus an element by its registered name; resolves false on timeout. */
  requestFocusObserved: (name: string, timeout: number) => ObservedRequest;
  /** Subscribe to any focused-element change. Returns unsubscribe fn. */
  subscribeFocusedElement: (callback: FocusedElementCallback) => () => void;
  /** Programmatically activate a modalizer for an element inside it. */
  activateModal: (elementFromModal: HTMLElement | undefined) => void;
  /** Ref-counted dispose. Removes listeners when the last consumer disposes. */
  dispose: () => void;
};

// ---------------------------------------------------------------------------
// Module-private registry
// ---------------------------------------------------------------------------

type ManagerState = {
  manager: NavigationManager;
  refCount: number;
  doc: Document;
  // Restorer: map from source id → most-recent target element
  restoreTargets: Map<string, HTMLElement>;
  // Observed elements: map from name → element
  observedElements: Map<string, HTMLElement>;
  // Focused element subscribers
  focusedElementCallbacks: Set<FocusedElementCallback>;
  // Currently active modal element (has modalizer config)
  activeModal: HTMLElement | undefined;
  // Groupper: active child per container (for roving tabindex)
  groupperActiveChild: WeakMap<HTMLElement, HTMLElement>;
  // Mover: memorized child per container
  moverMemorized: WeakMap<HTMLElement, HTMLElement>;
  // Event handler refs for cleanup
  onKeydown: (e: KeyboardEvent) => void;
  onFocusin: (e: FocusEvent) => void;
  onFocusout: (e: FocusEvent) => void;
  onCustomMoverMove: (e: Event) => void;
  onCustomGroupperMove: (e: Event) => void;
  mutationObserver: MutationObserver;
  // Keyboard detector owned by this manager (patched focus + keyboard detection)
  keyboardDetector: KeyboardDetector | null;
};

const registry = new WeakMap<Document, ManagerState>();

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createNavigationManager(doc: Document): NavigationManager {
  const existing = registry.get(doc);
  if (existing) {
    existing.refCount++;
    return existing.manager;
  }

  const state: ManagerState = {
    manager: null as unknown as NavigationManager,
    refCount: 1,
    doc,
    restoreTargets: new Map(),
    observedElements: new Map(),
    focusedElementCallbacks: new Set(),
    activeModal: undefined,
    groupperActiveChild: new WeakMap(),
    moverMemorized: new WeakMap(),
    onKeydown: null as unknown as (e: KeyboardEvent) => void,
    onFocusin: null as unknown as (e: FocusEvent) => void,
    onFocusout: null as unknown as (e: FocusEvent) => void,
    onCustomMoverMove: null as unknown as (e: Event) => void,
    onCustomGroupperMove: null as unknown as (e: Event) => void,
    mutationObserver: null as unknown as MutationObserver,
    // Create keyboard detector to enable programmatic-focus detection and
    // keyboard-vs-pointer tracking for this document's window.
    keyboardDetector: doc.defaultView ? createKeyboardDetector(doc.defaultView) : null,
  };

  // -------------------------------------------------------------------------
  // keydown — arrow nav + groupper tab + modal trap
  // -------------------------------------------------------------------------
  state.onKeydown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) {
      return;
    }

    // --- Arrow navigation (Mover) ---
    if (isArrowKey(e.key)) {
      const moverEl = findAncestorWithNavKey(target, 'mover') as HTMLElement | null;
      if (moverEl) {
        const config = getNavConfig(moverEl)!.mover!;
        // Check ignoreKeydown config on the container
        const ignoreKeydown = getNavConfig(moverEl)?.focusable?.ignoreKeydown;
        if (ignoreKeydown?.[e.key]) {
          return;
        }

        handleArrowKey(e, target, moverEl, config.direction ?? 'vertical', !!config.cyclic, state);
        return;
      }
    }

    // --- Tab key: groupper and modal ---
    if (e.key === 'Tab') {
      handleTab(e, target, state);
      return;
    }

    // --- Enter / Escape: groupper enter/exit ---
    if (e.key === 'Enter' || e.key === 'Escape') {
      handleGroupperEnterEscape(e, target, state);
    }
  };

  // -------------------------------------------------------------------------
  // focusin — update active children, restorer tracking, focused subscribers
  // -------------------------------------------------------------------------
  state.onFocusin = (e: FocusEvent) => {
    const target = e.target as HTMLElement | null;
    if (!isHTMLElement(target)) {
      return;
    }

    const relatedTarget = (e.relatedTarget as HTMLElement | null) ?? undefined;
    // consumeProgrammaticFocusFlag resets the flag — must be called once per focusin.
    // This window-level keyboardDetector listener fires first (window capture fires
    // before document capture), so the flag is still set when we reach here.
    const isFocusedProgrammatically = consumeProgrammaticFocusFlag(state.doc.defaultView);

    // Notify subscribers
    for (const cb of state.focusedElementCallbacks) {
      cb(target, { relatedTarget, isFocusedProgrammatically });
    }

    // Groupper: update roving tabindex when focus enters a limited groupper
    const groupperEl = findAncestorWithNavKey(target, 'groupper') as HTMLElement | null;
    if (groupperEl && target !== groupperEl) {
      const config = getNavConfig(groupperEl)!.groupper!;
      if (config.tabbability && config.tabbability !== 'unlimited') {
        applyRovingTabindex(groupperEl, target, state);
      }
    }

    // Restorer: track target elements (most recent target per modal id)
    const restorerEl = findAncestorWithNavKey(target, 'restorer') as HTMLElement | null;
    if (restorerEl) {
      const restorerConfig = getNavConfig(restorerEl)!.restorer!;
      if (restorerConfig.type === 'target') {
        // Find the active modal id to associate with this target
        const modalId = getActiveModalId(state);
        if (modalId) {
          state.restoreTargets.set(modalId, restorerEl);
        }
      }
    }
  };

  // -------------------------------------------------------------------------
  // focusout — update roving tabindex, focused subscribers
  // -------------------------------------------------------------------------
  state.onFocusout = (e: FocusEvent) => {
    const target = e.target as HTMLElement | null;
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (!isHTMLElement(target)) {
      return;
    }

    // Notify subscribers (focus moved away)
    if (!relatedTarget) {
      for (const cb of state.focusedElementCallbacks) {
        cb(undefined, {});
      }
    }

    // Groupper: when focus leaves the group entirely, keep last-focused as tabbable
    const groupperEl = findAncestorWithNavKey(target, 'groupper') as HTMLElement | null;
    if (groupperEl && (!relatedTarget || !groupperEl.contains(relatedTarget))) {
      const config = getNavConfig(groupperEl)?.groupper;
      if (config?.tabbability && config.tabbability !== 'unlimited') {
        // Keep the memorized (active) child as the re-entry point
        const active = state.groupperActiveChild.get(groupperEl);
        if (active && groupperEl.contains(active)) {
          active.setAttribute('tabindex', '0');
        }
      }
    }
  };

  // -------------------------------------------------------------------------
  // MoverMoveFocusEvent — programmatic arrow navigation
  // -------------------------------------------------------------------------
  state.onCustomMoverMove = (e: Event) => {
    const customEvent = e as CustomEvent<{ key: MoverKey }>;
    const target = e.target as HTMLElement | null;
    if (!target) {
      return;
    }

    const moverEl = findAncestorWithNavKey(target, 'mover') as HTMLElement | null;
    if (!moverEl) {
      return;
    }

    const config = getNavConfig(moverEl)!.mover!;
    const syntheticKbd = {
      key: customEvent.detail.key,
      preventDefault: () => e.preventDefault(),
      stopPropagation: () => e.stopPropagation(),
    } as KeyboardEvent;

    handleArrowKey(syntheticKbd, target, moverEl, config.direction ?? 'vertical', !!config.cyclic, state);
  };

  // -------------------------------------------------------------------------
  // GroupperMoveFocusEvent — programmatic enter/escape
  // -------------------------------------------------------------------------
  state.onCustomGroupperMove = (e: Event) => {
    const customEvent = e as CustomEvent<{ action: GroupperMoveFocusAction }>;
    const target = e.target as HTMLElement | null;
    if (!target) {
      return;
    }

    if (customEvent.detail.action === GroupperMoveFocusActions.Enter) {
      const groupperEl = findAncestorWithNavKey(target, 'groupper') as HTMLElement | null;
      if (groupperEl) {
        const first = findFirst(groupperEl);
        markProgrammatic(state);
        first?.focus();
      }
    } else if (customEvent.detail.action === GroupperMoveFocusActions.Escape) {
      const groupperEl = findAncestorWithNavKey(target, 'groupper') as HTMLElement | null;
      markProgrammatic(state);
      groupperEl?.focus();
    }
  };

  // -------------------------------------------------------------------------
  // MutationObserver — detect modalizer and observed elements entering/leaving
  // -------------------------------------------------------------------------
  const win = doc.defaultView;
  if (win) {
    state.mutationObserver = new win.MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes.item(i);
          if (isHTMLElement(node)) {
            checkForModalizer(node, state, true);
            syncObservedElements(node, state, true);
          }
        }
        for (let i = 0; i < mutation.removedNodes.length; i++) {
          const node = mutation.removedNodes.item(i);
          if (isHTMLElement(node)) {
            checkForModalizer(node, state, false);
            syncObservedElements(node, state, false);
          }
        }
        // Attribute changes on data-tabster
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === TABSTER_ATTRIBUTE_NAME &&
          isHTMLElement(mutation.target)
        ) {
          checkForModalizer(mutation.target, state, true);
          syncObservedElements(mutation.target, state, true);
        }
      }
    });

    state.mutationObserver.observe(doc.body ?? doc.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [TABSTER_ATTRIBUTE_NAME],
    });
  }

  // Attach document-level listeners
  doc.addEventListener('keydown', state.onKeydown, true);
  doc.addEventListener('focusin', state.onFocusin, true);
  doc.addEventListener('focusout', state.onFocusout, true);
  doc.addEventListener(MoverMoveFocusEventName, state.onCustomMoverMove, true);
  doc.addEventListener(GroupperMoveFocusEventName, state.onCustomGroupperMove, true);

  // -------------------------------------------------------------------------
  // Public manager API
  // -------------------------------------------------------------------------
  const manager: NavigationManager = {
    registerObservedElement(element: HTMLElement, names: string[]) {
      for (const name of names) {
        state.observedElements.set(name, element);
      }
      return () => {
        for (const name of names) {
          if (state.observedElements.get(name) === element) {
            state.observedElements.delete(name);
          }
        }
      };
    },

    requestFocusObserved(name: string, timeout: number): ObservedRequest {
      let cancelled = false;

      const result = new Promise<boolean>(resolve => {
        const observedElement = state.observedElements.get(name);
        if (observedElement) {
          markProgrammatic(state);
          observedElement.focus();
          resolve(true);
          return;
        }

        // Poll until the element is registered or timeout
        const startTime = Date.now();
        const interval = win?.setInterval?.(() => {
          if (cancelled) {
            win?.clearInterval?.(interval);
            resolve(false);
            return;
          }
          const el = state.observedElements.get(name);
          if (el) {
            win?.clearInterval?.(interval);
            markProgrammatic(state);
            el.focus();
            resolve(true);
            return;
          }
          if (Date.now() - startTime >= timeout) {
            win?.clearInterval?.(interval);
            resolve(false);
          }
        }, 50);
      });

      return {
        result,
        cancel: () => {
          cancelled = true;
        },
      };
    },

    subscribeFocusedElement(callback: FocusedElementCallback) {
      state.focusedElementCallbacks.add(callback);
      return () => {
        state.focusedElementCallbacks.delete(callback);
      };
    },

    activateModal(elementFromModal: HTMLElement | undefined) {
      if (!elementFromModal) {
        return;
      }
      const modalizerEl = findAncestorWithNavKey(elementFromModal, 'modalizer') as HTMLElement | null;
      if (modalizerEl) {
        activateModalizer(modalizerEl, state);
      }
    },

    dispose() {
      state.refCount--;
      if (state.refCount <= 0) {
        doc.removeEventListener('keydown', state.onKeydown, true);
        doc.removeEventListener('focusin', state.onFocusin, true);
        doc.removeEventListener('focusout', state.onFocusout, true);
        doc.removeEventListener(MoverMoveFocusEventName, state.onCustomMoverMove, true);
        doc.removeEventListener(GroupperMoveFocusEventName, state.onCustomGroupperMove, true);
        state.mutationObserver.disconnect();
        state.focusedElementCallbacks.clear();
        state.observedElements.clear();
        state.restoreTargets.clear();
        if (state.keyboardDetector) {
          disposeKeyboardDetector(state.keyboardDetector);
        }
        registry.delete(doc);
      }
    },
  };

  state.manager = manager;
  registry.set(doc, state);
  return manager;
}

export function disposeNavigationManager(manager: NavigationManager): void {
  manager.dispose();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function markProgrammatic(state: ManagerState): void {
  const win = state.doc.defaultView;
  if (win) {
    markNextFocusProgrammatic(win);
  }
}

// ---------------------------------------------------------------------------
// Arrow navigation
// ---------------------------------------------------------------------------

function isArrowKey(key: string): boolean {
  return (
    key === 'ArrowUp' ||
    key === 'ArrowDown' ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight' ||
    key === 'Home' ||
    key === 'End'
  );
}

function handleArrowKey(
  e: Pick<KeyboardEvent, 'key' | 'preventDefault'>,
  current: HTMLElement,
  container: HTMLElement,
  direction: MoverDirection,
  cyclic: boolean,
  state: ManagerState,
): void {
  const isVertical =
    direction === 'vertical' || direction === 'both' || direction === 'grid' || direction === 'gridLinear';
  const isHorizontal =
    direction === 'horizontal' || direction === 'both' || direction === 'grid' || direction === 'gridLinear';
  const isGrid = direction === 'grid' || direction === 'gridLinear';

  let next: HTMLElement | null = null;

  switch (e.key) {
    case 'ArrowDown':
      if (!isVertical) {
        return;
      }
      if (isGrid) {
        next = findNextInColumn(current, container, 'down');
      } else {
        next = findNext(current, container);
      }
      if (!next && cyclic) {
        next = findFirst(container);
      }
      break;

    case 'ArrowUp':
      if (!isVertical) {
        return;
      }
      if (isGrid) {
        next = findNextInColumn(current, container, 'up');
      } else {
        next = findPrev(current, container);
      }
      if (!next && cyclic) {
        next = findLast(container);
      }
      break;

    case 'ArrowRight':
      if (!isHorizontal) {
        return;
      }
      next = findNext(current, container);
      if (!next && cyclic) {
        next = findFirst(container);
      }
      break;

    case 'ArrowLeft':
      if (!isHorizontal) {
        return;
      }
      next = findPrev(current, container);
      if (!next && cyclic) {
        next = findLast(container);
      }
      break;

    case 'Home':
      next = findFirst(container);
      break;

    case 'End':
      next = findLast(container);
      break;

    default:
      return;
  }

  if (next && next !== current) {
    e.preventDefault();
    markProgrammatic(state);
    next.focus();

    // Update memorized element
    state.moverMemorized.set(container, next);

    // Dispatch events for external listeners
    next.dispatchEvent(new TabsterMoveFocusEvent({ by: 'mover', key: e.key }));
    container.dispatchEvent(new MoverMemorizedElementEvent({ element: next }));
  }
}

// ---------------------------------------------------------------------------
// Tab key handling
// ---------------------------------------------------------------------------

function handleTab(e: KeyboardEvent, target: HTMLElement, state: ManagerState): void {
  // 1. Modal trap takes highest priority
  if (state.activeModal) {
    const modalConfig = getNavConfig(state.activeModal)?.modalizer;
    if (modalConfig?.isTrapped) {
      const allFocusable = findAll(state.activeModal);
      if (allFocusable.length === 0) {
        return;
      }

      const first = allFocusable[0];
      const last = allFocusable[allFocusable.length - 1];

      if (!e.shiftKey && target === last) {
        e.preventDefault();
        markProgrammatic(state);
        first.focus();
        return;
      }
      if (e.shiftKey && target === first) {
        e.preventDefault();
        markProgrammatic(state);
        last.focus();
        return;
      }
      return;
    }

    // Non-legacy trap: keep focus inside modal by preventing tab outside
    if (modalConfig && !modalConfig.isOthersAccessible) {
      if (!state.activeModal.contains(target)) {
        e.preventDefault();
        const first = findFirst(state.activeModal);
        markProgrammatic(state);
        first?.focus();
        return;
      }
    }
  }

  // 2. Groupper limited-trap
  const groupperEl = findAncestorWithNavKey(target, 'groupper') as HTMLElement | null;
  if (groupperEl) {
    const config = getNavConfig(groupperEl)!.groupper!;

    if (config.tabbability === 'limited-trap') {
      const allFocusable = findAll(groupperEl);
      if (allFocusable.length === 0) {
        return;
      }

      const first = allFocusable[0];
      const last = allFocusable[allFocusable.length - 1];

      if (!e.shiftKey && target === last) {
        e.preventDefault();
        markProgrammatic(state);
        first.focus();
        return;
      }
      if (e.shiftKey && target === first) {
        e.preventDefault();
        markProgrammatic(state);
        last.focus();
        return;
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Groupper Enter / Escape
// ---------------------------------------------------------------------------

function handleGroupperEnterEscape(e: KeyboardEvent, target: HTMLElement, state: ManagerState): void {
  const groupperEl = findAncestorWithNavKey(target, 'groupper') as HTMLElement | null;
  if (!groupperEl) {
    return;
  }

  const config = getNavConfig(groupperEl)!.groupper!;
  if (config.tabbability === 'unlimited') {
    return;
  }

  if (e.key === 'Enter' && target === groupperEl) {
    e.preventDefault();
    const active = state.groupperActiveChild.get(groupperEl);
    const toFocus = active && groupperEl.contains(active) ? active : findFirst(groupperEl);
    markProgrammatic(state);
    toFocus?.focus();
    target.dispatchEvent(new TabsterMoveFocusEvent({ by: 'groupper', key: 'Enter' }));
  } else if (e.key === 'Escape' && groupperEl.contains(target)) {
    e.preventDefault();
    markProgrammatic(state);
    groupperEl.focus();
    target.dispatchEvent(new TabsterMoveFocusEvent({ by: 'groupper', key: 'Escape' }));
  }
}

// ---------------------------------------------------------------------------
// Roving tabindex for Groupper
// ---------------------------------------------------------------------------

function applyRovingTabindex(container: HTMLElement, focused: HTMLElement, state: ManagerState): void {
  state.groupperActiveChild.set(container, focused);
  const allFocusable = findAll(container);
  for (const el of allFocusable) {
    el.setAttribute('tabindex', el === focused ? '0' : '-1');
  }
}

// ---------------------------------------------------------------------------
// Modalizer
// ---------------------------------------------------------------------------

function getActiveModalId(state: ManagerState): string | undefined {
  if (!state.activeModal) {
    return undefined;
  }
  return getNavConfig(state.activeModal)?.modalizer?.id;
}

function activateModalizer(modalizerEl: HTMLElement, state: ManagerState): void {
  if (state.activeModal === modalizerEl) {
    return;
  }

  // Deactivate previous modal if any
  if (state.activeModal) {
    deactivateModalizer(state.activeModal, state);
  }

  state.activeModal = modalizerEl;
  const config = getNavConfig(modalizerEl)?.modalizer;
  if (!config || config.isOthersAccessible) {
    return;
  }

  // Hide all top-level siblings of modal's ancestor chain from assistive technology
  applyAriaHiddenToSiblings(modalizerEl, state.doc, true);
}

function deactivateModalizer(modalizerEl: HTMLElement, state: ManagerState): void {
  if (state.activeModal !== modalizerEl) {
    return;
  }

  const config = getNavConfig(modalizerEl)?.modalizer;
  if (config && !config.isOthersAccessible) {
    applyAriaHiddenToSiblings(modalizerEl, state.doc, false);
  }

  // Restore focus to the last known target for this modal
  const modalId = config?.id;
  if (modalId) {
    const target = state.restoreTargets.get(modalId);
    if (target && state.doc.contains(target)) {
      markProgrammatic(state);
      target.focus();
    }
  }

  state.activeModal = undefined;
}

/**
 * Add or remove aria-hidden on all top-level elements that are not ancestors of `modalizerEl`.
 * This mirrors tabster's Modalizer "hide everything else" behaviour.
 */
function applyAriaHiddenToSiblings(modalizerEl: HTMLElement, doc: Document, hide: boolean): void {
  const root = doc.body ?? doc.documentElement;

  // Build ancestor set
  const ancestors = new Set<Element>();
  let el: Element | null = modalizerEl;
  while (el && el !== root) {
    ancestors.add(el);
    el = el.parentElement;
  }

  // Iterate children of root and of each ancestor
  function processChildren(parent: Element) {
    for (const child of Array.from(parent.children)) {
      if (ancestors.has(child)) {
        processChildren(child);
      } else {
        // Check for never-hide attribute
        if (child.hasAttribute('data-tabster-never-hide')) {
          continue;
        }
        if (hide) {
          if (!child.hasAttribute('aria-hidden')) {
            child.setAttribute('aria-hidden', 'true');
            child.setAttribute('data-fui-aria-hidden-by-modal', '');
          }
        } else {
          if (child.hasAttribute('data-fui-aria-hidden-by-modal')) {
            child.removeAttribute('aria-hidden');
            child.removeAttribute('data-fui-aria-hidden-by-modal');
          }
        }
      }
    }
  }

  processChildren(root);
}

function checkForModalizer(el: HTMLElement, state: ManagerState, added: boolean): void {
  // Check this element and its descendants for modalizer configs
  const candidates = [el, ...Array.from(el.querySelectorAll(`[${TABSTER_ATTRIBUTE_NAME}]`))];
  for (const candidate of candidates) {
    if (!isHTMLElement(candidate)) {
      continue;
    }
    const config = getNavConfig(candidate)?.modalizer;
    if (!config) {
      continue;
    }

    if (added) {
      // Auto-activate if it is the only / topmost modal
      if (!state.activeModal) {
        activateModalizer(candidate, state);
      }
    } else {
      if (state.activeModal === candidate) {
        deactivateModalizer(candidate, state);
      }
    }
  }
}

/**
 * Sync observed element registrations when elements are added/removed from the DOM.
 */
function syncObservedElements(el: HTMLElement, state: ManagerState, added: boolean): void {
  const candidates = [el, ...Array.from(el.querySelectorAll(`[${TABSTER_ATTRIBUTE_NAME}]`))];
  for (const candidate of candidates) {
    if (!isHTMLElement(candidate)) {
      continue;
    }
    const names = getNavConfig(candidate)?.observed?.names;
    if (!names || names.length === 0) {
      continue;
    }

    if (added) {
      for (const name of names) {
        state.observedElements.set(name, candidate);
      }
    } else {
      for (const name of names) {
        if (state.observedElements.get(name) === candidate) {
          state.observedElements.delete(name);
        }
      }
    }
  }
}
