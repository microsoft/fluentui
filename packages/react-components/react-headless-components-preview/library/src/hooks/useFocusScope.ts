'use client';

import * as React from 'react';

const AUTOFOCUS_ON_MOUNT = 'focusScope.autoFocusOnMount';
const AUTOFOCUS_ON_UNMOUNT = 'focusScope.autoFocusOnUnmount';
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

export interface UseFocusScopeOptions {
  /**
   * When `true`, tabbing from the last item will focus the first tabbable element,
   * and shift+tab from the first item will focus the last tabbable.
   * @defaultValue false
   */
  loop?: boolean;

  /**
   * When `true`, focus cannot escape the scope via keyboard, pointer,
   * or programmatic focus.
   * @defaultValue false
   */
  trapped?: boolean;

  /**
   * Called when auto-focusing on mount. Call `event.preventDefault()` to cancel.
   */
  onMountAutoFocus?: (event: Event) => void;

  /**
   * Called when auto-focusing on unmount (restoring focus to the previously focused
   * element). Call `event.preventDefault()` to cancel the restore.
   */
  onUnmountAutoFocus?: (event: Event) => void;
}

export interface UseFocusScopeReturn {
  /**
   * Ref callback to attach to the container element.
   * Can be composed with other refs via `useMergedRefs`.
   */
  containerRef: React.RefCallback<HTMLElement>;

  /**
   * Props to spread onto the container element.
   * Provides `tabIndex` and `onKeyDown` for keyboard looping.
   */
  containerProps: {
    tabIndex: number;
    onKeyDown: React.KeyboardEventHandler<HTMLElement>;
  };
}

/**
 * Manages focus scoping within a container element.
 *
 * When `trapped` is `true`, focus is kept inside the container — including
 * programmatic focus changes. When `loop` is `true`, tab navigation wraps around
 * from the last tabbable element to the first and vice versa.
 *
 * On mount, focus moves to the first tabbable element inside the container
 * (links excluded). On unmount, focus is restored to the element that was
 * focused before the scope mounted.
 *
 * Nested scopes are supported via a global stack: the outermost scope is paused
 * while an inner scope is active and automatically resumes when the inner scope unmounts.
 *
 * @example
 * ```tsx
 * function Popover({ children }) {
 *   const { containerRef, containerProps } = useFocusScope({ loop: true, trapped: true });
 *   return (
 *     <div ref={containerRef} {...containerProps}>
 *       {children}
 *     </div>
 *   );
 * }
 * ```
 */
export function useFocusScope(options: UseFocusScopeOptions = {}): UseFocusScopeReturn {
  const { loop = false, trapped = false, onMountAutoFocus, onUnmountAutoFocus } = options;

  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  // Keep mutable refs so effects always call the latest callback without re-running.
  const onMountAutoFocusRef = React.useRef(onMountAutoFocus);
  const onUnmountAutoFocusRef = React.useRef(onUnmountAutoFocus);
  onMountAutoFocusRef.current = onMountAutoFocus;
  onUnmountAutoFocusRef.current = onUnmountAutoFocus;

  const lastFocusedElementRef = React.useRef<HTMLElement | null>(null);

  // Stable per-instance object used by the global focusScopesStack to pause/resume.
  const focusScope = React.useRef({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    },
  }).current;

  // --- Focus trapping ---
  // Document-level listeners redirect any focus that escapes back into the container.
  // A MutationObserver re-focuses the container if the focused element is removed from the DOM.
  React.useEffect(() => {
    if (!trapped || !container) return;

    const handleFocusIn = (event: FocusEvent) => {
      if (focusScope.paused) return;
      const target = event.target as HTMLElement | null;
      if (container.contains(target)) {
        lastFocusedElementRef.current = target;
      } else {
        focusElement(lastFocusedElementRef.current, { select: true });
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (focusScope.paused) return;
      const relatedTarget = event.relatedTarget as HTMLElement | null;
      // Null relatedTarget means the browser/app/tab lost focus, or Chrome removed
      // the focused element. Calling focus() in the Chrome removal case spikes CPU
      // to 100%, so we let the browser recover on its own.
      if (relatedTarget === null) return;
      if (!container.contains(relatedTarget)) {
        focusElement(lastFocusedElementRef.current, { select: true });
      }
    };

    // When the focused element is removed from the DOM, Chrome moves focus to
    // document.body. Re-focus the container to keep the trap intact.
    const handleMutations = (mutations: MutationRecord[]) => {
      const active = document.activeElement as HTMLElement | null;
      if (active !== document.body) return;
      for (const mutation of mutations) {
        if (mutation.removedNodes.length > 0) focusElement(container);
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    const observer = new MutationObserver(handleMutations);
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      observer.disconnect();
    };
  }, [trapped, container, focusScope]);

  // --- Auto-focus on mount / restore focus on unmount ---
  React.useEffect(() => {
    if (!container) return;

    focusScopesStack.add(focusScope);
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Only auto-focus if nothing inside the scope already has focus.
    if (!container.contains(previouslyFocused)) {
      // Dispatch a cancellable custom event so consumers can call preventDefault()
      // to suppress the built-in auto-focus behaviour.
      const onMount = (e: Event) => onMountAutoFocusRef.current?.(e);
      const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
      container.addEventListener(AUTOFOCUS_ON_MOUNT, onMount);
      container.dispatchEvent(mountEvent);
      container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMount);

      if (!mountEvent.defaultPrevented) {
        focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
        // If no tabbable element accepted focus, fall back to the container itself.
        if (document.activeElement === previouslyFocused) focusElement(container);
      }
    }

    return () => {
      // Delay to work around a React ≤16 bug where calling focus() during unmount throws:
      // https://github.com/facebook/react/issues/17894
      setTimeout(() => {
        const onUnmount = (e: Event) => onUnmountAutoFocusRef.current?.(e);
        const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
        container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmount);
        container.dispatchEvent(unmountEvent);
        container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmount);

        if (!unmountEvent.defaultPrevented) {
          focusElement(previouslyFocused ?? document.body, { select: true });
        }

        focusScopesStack.remove(focusScope);
      }, 0);
    };
  }, [container, focusScope]);

  // --- Keyboard looping ---
  // Intercepts Tab / Shift+Tab at the edges of the scope and wraps focus around.
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (!loop && !trapped) return;
      if (focusScope.paused) return;

      const isTab = event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey;
      if (!isTab) return;

      const focused = document.activeElement as HTMLElement | null;
      if (!focused) return;

      const scopeContainer = event.currentTarget as HTMLElement;
      const [first, last] = getTabbableEdges(scopeContainer);

      if (!first || !last) {
        // No tabbable children — block tab from leaving when the container itself is focused.
        if (focused === scopeContainer) event.preventDefault();
        return;
      }

      if (!event.shiftKey && focused === last) {
        event.preventDefault();
        if (loop) focusElement(first, { select: true });
      } else if (event.shiftKey && focused === first) {
        event.preventDefault();
        if (loop) focusElement(last, { select: true });
      }
    },
    // focusScope is a stable object reference — reads .paused at call time, not at memoization time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loop, trapped],
  );

  const containerRef = React.useCallback((node: HTMLElement | null) => {
    setContainer(node);
  }, []);

  return {
    containerRef,
    containerProps: {
      tabIndex: -1,
      onKeyDown: handleKeyDown,
    },
  };
}

/* ---------------------------------------------------------------------------
 * Internal focus utilities
 * -------------------------------------------------------------------------*/

/**
 * Attempts to focus the first candidate that accepts focus.
 * Stops as soon as `document.activeElement` changes.
 */
function focusFirst(candidates: HTMLElement[], { select = false } = {}): void {
  const prev = document.activeElement;
  for (const candidate of candidates) {
    focusElement(candidate, { select });
    if (document.activeElement !== prev) return;
  }
}

/**
 * Returns the first and last tabbable elements inside `container`.
 */
function getTabbableEdges(container: HTMLElement): [HTMLElement | undefined, HTMLElement | undefined] {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible([...candidates].reverse(), container);
  return [first, last];
}

/**
 * Returns all tabbable candidates within `container` in DOM order.
 *
 * This is an approximation — runtime visibility is resolved separately by
 * `findVisible`. Positive `tabIndex` values are intentionally ignored to avoid
 * diverging from visual order, which hinders accessibility.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
 */
function getTabbableCandidates(container: HTMLElement): HTMLElement[] {
  const nodes: HTMLElement[] = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node: Element) {
      const el = node as HTMLElement;
      if (el.tagName === 'INPUT' && (el as HTMLInputElement).type === 'hidden') {
        return NodeFilter.FILTER_SKIP;
      }
      if ((el as HTMLInputElement).disabled || el.hidden) return NodeFilter.FILTER_SKIP;
      return el.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  while (walker.nextNode()) nodes.push(walker.currentNode as HTMLElement);
  return nodes;
}

/**
 * Returns the first element in `elements` that is not visually hidden.
 * Visibility is only checked up to (but not including) `container`.
 */
function findVisible(elements: HTMLElement[], container: HTMLElement): HTMLElement | undefined {
  for (const el of elements) {
    if (!isHidden(el, { upTo: container })) return el;
  }
}

function isHidden(node: HTMLElement, { upTo }: { upTo?: HTMLElement } = {}): boolean {
  if (getComputedStyle(node).visibility === 'hidden') return true;
  let current: HTMLElement | null = node;
  while (current) {
    if (upTo !== undefined && current === upTo) return false;
    if (getComputedStyle(current).display === 'none') return true;
    current = current.parentElement;
  }
  return false;
}

function focusElement(element?: HTMLElement | null, { select = false } = {}): void {
  if (!element?.focus) return;
  const prev = document.activeElement;
  // preventScroll avoids jarring scroll jumps when focus moves programmatically.
  element.focus({ preventScroll: true });
  if (element !== prev && element instanceof HTMLInputElement && select) {
    element.select();
  }
}

/** Excludes anchor elements — links can't be auto-focused on mount without side effects. */
function removeLinks(items: HTMLElement[]): HTMLElement[] {
  return items.filter(item => item.tagName !== 'A');
}

/* ---------------------------------------------------------------------------
 * Focus scope stack
 *
 * Maintains a stack of active focus scopes. When a new scope mounts, the
 * previously active scope is paused. When a scope unmounts, the scope below
 * it in the stack is resumed. This allows nested modals / popovers to work
 * correctly without scopes fighting each other.
 * -------------------------------------------------------------------------*/

type FocusScopeAPI = { paused: boolean; pause(): void; resume(): void };

const focusScopesStack = createFocusScopesStack();

function createFocusScopesStack() {
  let stack: FocusScopeAPI[] = [];

  return {
    add(scope: FocusScopeAPI) {
      // Pause the currently active scope before pushing the new one.
      const active = stack[0];
      if (scope !== active) active?.pause();
      // Re-insert at the top in case this scope already exists deeper in the stack.
      stack = stack.filter(s => s !== scope);
      stack.unshift(scope);
    },

    remove(scope: FocusScopeAPI) {
      stack = stack.filter(s => s !== scope);
      // Resume the scope that is now at the top of the stack.
      stack[0]?.resume();
    },
  };
}
