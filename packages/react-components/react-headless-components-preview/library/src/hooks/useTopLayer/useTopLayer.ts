'use client';

import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import {
  hasOpenNestedPopover,
  isDialogElement,
  isInTopLayer,
  isPopoverOpen,
  supportsPopoverHint,
  waitForAnimations,
} from '../../utils/topLayer';
import type { ToggleEvent } from '../../utils/topLayer';
import {
  getActiveElement,
  getFocusables,
  getInitialFocusTarget,
  isInNestedLayer,
  isSameTabStop,
} from '../../utils/focus';
import type { TopLayerCloseData, TopLayerMode, TopLayerPhase, TopLayerRole } from './TopLayer.types';

export type UseTopLayerOptions = {
  /**
   * Whether the element should be in the top layer. React owns this state.
   */
  open: boolean;

  /**
   * How the element enters the top layer. `modal` requires a `<dialog>` element.
   */
  mode: TopLayerMode;

  /**
   * Role of the element. Decides where focus moves on open and whether Tab wraps inside a modal.
   */
  role?: TopLayerRole | (string & {});

  /**
   * Called when the browser closes the element: Escape, light dismiss, or a native `<dialog>` close.
   * Closes caused by `open` becoming false are not reported.
   *
   * The browser has already hidden the element when this is called, except for a modal with `preventEscapeClose`,
   * which stays open until `open` is false.
   */
  onClose?: (data: TopLayerCloseData) => void;

  /**
   * Called when the browser opens a popover while `open` is false, e.g. a `popovertarget` or `commandfor` invoker.
   * Set `open` to true in response. Without it, such opens are ignored and warned about in development.
   */
  onOpen?: (event: Event) => void;

  /**
   * On close, move focus to `restoreFocusTarget` (or the element that was focused before opening) when focus was
   * inside the element as it started closing and is now still inside it or lost to `<body>`. The browser restores
   * focus first; this covers the cases it does not. Focus the user moved elsewhere is left alone.
   * @default true
   */
  restoreFocus?: boolean;

  /**
   * Remove the element from the DOM once the browser has finished closing it and its exit animations ran.
   * @default true
   */
  unmountOnClose?: boolean;

  /**
   * `modal` only. Keep the dialog open on Escape and report it through `onClose`, so the consumer decides
   * whether to close. By default the browser closes the dialog and `onClose` reports it afterwards.
   * @default false
   */
  preventEscapeClose?: boolean;

  /**
   * Element that receives focus on close instead of the element focused before opening, e.g. the trigger.
   */
  restoreFocusTarget?: React.RefObject<HTMLElement | null>;

  /**
   * `hint` only. What browsers without `popover="hint"` get: `auto` (light dismiss, but closes other `auto`
   * popovers) or `manual` (no light dismiss, leaves other popovers alone).
   * @default 'auto'
   */
  hintFallback?: 'auto' | 'manual';
};

export type UseTopLayerReturn = {
  /**
   * Whether the element should be present in the DOM this render.
   * Stays true while the element closes and its exit animations run.
   */
  shouldRender: boolean;

  /**
   * Current lifecycle phase.
   */
  phase: TopLayerPhase;

  /**
   * Value for the element's `popover` attribute: the mode, or `undefined` for `modal`.
   */
  popover: Exclude<TopLayerMode, 'modal'> | undefined;
};

const MODAL_ROLES_WITH_FOCUS_WRAP = new Set(['dialog', 'alertdialog']);

/* eslint-disable no-console */
const show = (element: HTMLElement, mode: TopLayerMode): boolean => {
  if (mode === 'modal') {
    if (!isDialogElement(element)) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          '@fluentui/react-headless-components-preview [useTopLayer]: `mode="modal"` requires a <dialog> element.',
        );
      }
      return false;
    }

    if (element.open) {
      return false;
    }

    element.showModal();
    return true;
  }

  if (isPopoverOpen(element)) {
    return false;
  }

  if (typeof element.showPopover !== 'function') {
    if (isDialogElement(element) && !element.open) {
      element.show();
      return true;
    }

    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '@fluentui/react-headless-components-preview [useTopLayer]: the Popover API is not supported in this browser. ' +
          'Include a popover polyfill for better browser support.',
      );
    }

    return false;
  }

  try {
    element.showPopover();
    return true;
  } catch {
    return false;
  }
};
/* eslint-enable no-console */

const hide = (element: HTMLElement): void => {
  if (typeof element.hidePopover === 'function' && isPopoverOpen(element)) {
    element.hidePopover();
  } else if (isDialogElement(element) && element.open) {
    element.close();
  }
};

const setInert = (element: HTMLElement, inert: boolean): void => {
  if (inert) {
    element.setAttribute('inert', '');
    element.setAttribute('aria-hidden', 'true');
  } else if (element.hasAttribute('inert')) {
    element.removeAttribute('inert');
    element.removeAttribute('aria-hidden');
  }
};

/**
 * Keeps an element's top-layer state (`showPopover`/`hidePopover`, `showModal`/`close`) in sync with React state.
 *
 * - Reports native closes (Escape, light dismiss) through `onClose`; React stays the owner of `open`.
 * - Moves focus on open according to `role`, wraps Tab inside modal dialogs, and restores focus on close.
 * - Keeps a closing element mounted and inert until the browser finished closing it and its exit animations ran.
 *
 * The element is never moved in the DOM: it inherits CSS custom properties, `dir` and event bubbling from where
 * it is rendered. Positioning is not included; compose with `usePositioning`.
 *
 * @example
 * ```tsx
 * const ref = React.useRef<HTMLDivElement>(null);
 * const { shouldRender, popover } = useTopLayer(ref, { open, mode: 'auto', role: 'menu', onClose: () => setOpen(false) });
 * return shouldRender ? <div ref={ref} popover={popover} role="menu" aria-label="Actions">…</div> : null;
 * ```
 */
export const useTopLayer = (
  elementRef: React.RefObject<HTMLElement | null>,
  options: UseTopLayerOptions,
): UseTopLayerReturn => {
  const {
    open,
    mode,
    role,
    restoreFocus = true,
    unmountOnClose = true,
    preventEscapeClose = false,
    hintFallback = 'auto',
  } = options;

  // `open` as of the last commit. Read during render so a closing element stays mounted without spending a render
  // when it opens.
  const openRef = React.useRef(open);
  const [exitPending, setExitPending] = React.useState(false);
  const [entering, setEntering] = React.useState(false);
  const [syncCount, resync] = React.useReducer((count: number) => count + 1, 0);

  // eslint-disable-next-line react-hooks/refs
  const closing = !open && openRef.current;
  const shouldRender = open || closing || exitPending || !unmountOnClose;
  const phase: TopLayerPhase = open ? (entering ? 'entering' : 'open') : closing || exitPending ? 'exiting' : 'closed';

  const previouslyFocusedElement = React.useRef<HTMLElement | null>(null);
  // Whether focus was inside when the element started closing; `null` when unknown.
  const focusWasInside = React.useRef<boolean | null>(null);
  const escapePressed = React.useRef(false);
  const escapeClosedNestedPopover = React.useRef(false);
  const modalCancelled = React.useRef(false);
  const warnedNativeOpen = React.useRef(false);

  const exit = React.useRef<{
    waitingForNativeClose: boolean;
    waitingForAnimations: boolean;
    cancelAnimations: () => void;
  }>({
    waitingForNativeClose: false,
    waitingForAnimations: false,
    cancelAnimations: () => undefined,
  });

  const cancelExit = () => {
    exit.current.cancelAnimations();
    exit.current = { waitingForNativeClose: false, waitingForAnimations: false, cancelAnimations: () => undefined };
  };

  const completeExitIfDone = useEventCallback(() => {
    if (!exit.current.waitingForNativeClose && !exit.current.waitingForAnimations) {
      setExitPending(false);
    }
  });

  const finishClose = useEventCallback((element: HTMLElement) => {
    const wasInside = focusWasInside.current;
    const target = options.restoreFocusTarget?.current ?? previouslyFocusedElement.current;
    focusWasInside.current = null;
    previouslyFocusedElement.current = null;
    if (!restoreFocus || !wasInside || !target?.isConnected) {
      return;
    }
    const activeElement = getActiveElement(element);
    if (!activeElement || activeElement === element.ownerDocument.body || element.contains(activeElement)) {
      target.focus({ preventScroll: true });
    }
  });

  const trackFocusOnClose = (element: HTMLElement) => {
    focusWasInside.current = element.contains(getActiveElement(element));
  };

  const reportClose = useEventCallback((data: TopLayerCloseData) => {
    if (!openRef.current) {
      return;
    }
    options.onClose?.(data);
    // A consumer that keeps `open` gets the element shown again.
    resync();
  });

  const nativeCloseFinished = useEventCallback(() => {
    if (exit.current.waitingForNativeClose) {
      exit.current.waitingForNativeClose = false;
      completeExitIfDone();
    }
  });

  const handleBeforeToggle = useEventCallback((event: Event) => {
    const element = event.currentTarget as HTMLElement;
    if ((event as ToggleEvent).newState === 'closed') {
      trackFocusOnClose(element);
    } else if (!openRef.current) {
      // A native open (invoker): snapshot focus before the browser moves it.
      previouslyFocusedElement.current = getActiveElement(element) as HTMLElement | null;
    }
  });

  const handleToggle = useEventCallback((event: Event) => {
    const element = event.currentTarget as HTMLElement;
    const newState = (event as ToggleEvent).newState;
    // `toggle` is dispatched asynchronously; skip events made stale by a later show/hide.
    if ((newState === 'open') !== isPopoverOpen(element)) {
      return;
    }

    if (newState === 'open') {
      if (openRef.current) {
        return;
      }
      if (options.onOpen) {
        options.onOpen(event);
      } else if (process.env.NODE_ENV !== 'production' && !warnedNativeOpen.current) {
        warnedNativeOpen.current = true;
        // eslint-disable-next-line no-console
        console.warn(
          '@fluentui/react-headless-components-preview [useTopLayer]: the browser opened a top-layer element while ' +
            '`open` is false (e.g. a `popovertarget` invoker). Pass `onOpen` to sync it into React state.',
        );
      }
      return;
    }

    nativeCloseFinished();
    const type = escapePressed.current ? 'escape' : 'light-dismiss';
    escapePressed.current = false;
    reportClose({ type, event });
  });

  const handleDocumentKeyDown = useEventCallback((event: KeyboardEvent) => {
    const element = elementRef.current;
    if (event.key !== 'Escape' || !element) {
      return;
    }
    const nestedOpen = hasOpenNestedPopover(element);
    // Escape closes the topmost popover only.
    escapePressed.current = !nestedOpen && isPopoverOpen(element);
    escapeClosedNestedPopover.current = nestedOpen;
  });

  const handleDocumentKeyUp = useEventCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      escapePressed.current = false;
    }
  });

  const handleCancel = useEventCallback((event: Event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    // WebKit fires `cancel` even when Escape closed a popover inside the dialog; keep the dialog open.
    if (escapeClosedNestedPopover.current) {
      escapeClosedNestedPopover.current = false;
      event.preventDefault();
      return;
    }
    trackFocusOnClose(event.currentTarget as HTMLElement);
    if (preventEscapeClose) {
      event.preventDefault();
      reportClose({ type: 'escape', event });
      return;
    }
    // The browser closes the dialog; `close` reports it.
    modalCancelled.current = true;
  });

  const handleClose = useEventCallback((event: Event) => {
    const element = event.currentTarget as HTMLElement;
    // Skip events from nested dialogs, and a queued `close` that arrives after the dialog reopened.
    if (event.target !== element || (isDialogElement(element) && element.open)) {
      return;
    }
    nativeCloseFinished();
    // Escape (after an allowed `cancel`), a form with `method="dialog"`, or a forced close after repeated Escape.
    const type = modalCancelled.current ? 'escape' : 'native-close';
    modalCancelled.current = false;
    reportClose({ type, event });
  });

  // Browsers without `beforetoggle` on dialogs: a focus loss after the dialog closed means focus was inside.
  const handleDialogFocusOut = useEventCallback((event: FocusEvent) => {
    const element = event.currentTarget as HTMLElement;
    if (isDialogElement(element)) {
      focusWasInside.current = element.open ? null : true;
    }
  });

  const handleFocusWrap = useEventCallback((event: KeyboardEvent) => {
    const element = event.currentTarget as HTMLElement;
    if (event.key !== 'Tab' || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    const activeElement = getActiveElement(element);
    if (isInNestedLayer(activeElement, element)) {
      return;
    }
    const focusables = getFocusables(element);
    if (focusables.length === 0) {
      event.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && (isSameTabStop(activeElement, first) || activeElement === element)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && isSameTabStop(activeElement, last)) {
      event.preventDefault();
      first.focus();
    }
  });

  const wrapsFocus = mode === 'modal' && MODAL_ROLES_WITH_FOCUS_WRAP.has(role ?? '');

  // Bound after every commit, before the show/hide effect: the element can be replaced (keys, consumers that render
  // it only while open), and events dispatched synchronously by show must be observed.
  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }
    const ownerDocument = element.ownerDocument;

    // Unsupported `hint` reflects as `manual`. Patch the attribute after mount, before the element is shown,
    // so server and client render the same markup.
    if (
      mode === 'hint' &&
      hintFallback === 'auto' &&
      element.getAttribute('popover') === 'hint' &&
      !supportsPopoverHint(ownerDocument)
    ) {
      element.setAttribute('popover', 'auto');
    }

    const cleanups: Array<() => void> = [];
    const listen = (target: EventTarget, type: string, listener: EventListener, capture = false) => {
      target.addEventListener(type, listener, capture);
      cleanups.push(() => target.removeEventListener(type, listener, capture));
    };

    listen(ownerDocument, 'keydown', handleDocumentKeyDown as EventListener, true);
    listen(ownerDocument, 'keyup', handleDocumentKeyUp as EventListener, true);

    if (mode === 'modal') {
      listen(element, 'cancel', handleCancel);
      listen(element, 'close', handleClose);
      listen(element, 'focusout', handleDialogFocusOut as EventListener);
    } else {
      listen(element, 'beforetoggle', handleBeforeToggle);
      listen(element, 'toggle', handleToggle);
    }

    if (wrapsFocus) {
      listen(element, 'keydown', handleFocusWrap as EventListener, true);
    }

    return () => cleanups.forEach(cleanup => cleanup());
  });

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    const wasOpen = openRef.current;
    openRef.current = open;

    if (open) {
      cancelExit();
      if (exitPending) {
        setExitPending(false);
      }
      if (!element) {
        return;
      }

      // Also covers an element the browser opened natively while it was still inert from its last exit.
      setInert(element, false);
      if (!isInTopLayer(element)) {
        previouslyFocusedElement.current = getActiveElement(element) as HTMLElement | null;
        focusWasInside.current = null;
        escapePressed.current = false;
        modalCancelled.current = false;
      }

      // Modal dialogs focus their content natively; popovers only honour `autofocus`.
      if (show(element, mode) && mode !== 'modal' && !element.contains(getActiveElement(element))) {
        getInitialFocusTarget(element, role)?.focus();
      }

      // Spend a render on `entering` only when something animates.
      let settled = false;
      let synchronous = true;
      const cancelEnter = waitForAnimations(element, () => {
        settled = true;
        if (!synchronous) {
          setEntering(false);
        }
      });
      synchronous = false;
      if (!settled) {
        setEntering(true);
      }
      return () => {
        cancelEnter();
        if (!settled) {
          setEntering(false);
        }
      };
    }

    if (!wasOpen) {
      // Initially closed, or a re-run while already closing: keep the element hidden.
      if (element && !exit.current.waitingForNativeClose) {
        hide(element);
      }
      return;
    }

    if (!element) {
      // The consumer unmounted the element itself; there is nothing left to wait for.
      resync();
      return;
    }

    if (focusWasInside.current === null) {
      trackFocusOnClose(element);
    }
    const wasShown = isInTopLayer(element);
    hide(element);
    finishClose(element);

    // Native focus restore runs during hide; mark the element inert only after it, unless it was reopened.
    queueMicrotask(() => {
      if (!isInTopLayer(element)) {
        setInert(element, true);
      }
    });

    // Unmount once the browser reports the close (`close` / `toggle`) and exit animations ran.
    cancelExit();
    exit.current.waitingForNativeClose = wasShown;
    exit.current.waitingForAnimations = true;
    exit.current.cancelAnimations = waitForAnimations(element, () => {
      exit.current.waitingForAnimations = false;
      completeExitIfDone();
    });
    if (exit.current.waitingForNativeClose || exit.current.waitingForAnimations) {
      setExitPending(true);
    } else {
      resync();
    }
    // `exitPending` is read, not watched: it only changes as a result of this effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, open, mode, role, syncCount, completeExitIfDone, finishClose]);

  React.useEffect(() => () => exit.current.cancelAnimations(), []);

  return {
    shouldRender,
    phase,
    popover: mode === 'modal' ? undefined : mode,
  };
};
