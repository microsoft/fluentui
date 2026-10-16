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
import { getFocusables, getInitialFocusTarget, isInNestedLayer, isSameTabStop } from '../../utils/focus';
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
   * The browser has already hidden a popover when this is called; a modal stays open until `open` is false.
   */
  onClose?: (data: TopLayerCloseData) => void;

  /**
   * Called when the browser opens a popover while `open` is false, e.g. a `popovertarget` or `commandfor` invoker.
   * Set `open` to true in response. Without it, such opens are ignored and warned about in development.
   */
  onOpen?: (event: Event) => void;

  /**
   * On close, move focus back to the element that was focused before opening, when focus is still inside the
   * element or lost to `<body>`. The browser restores focus first; this covers the cases it does not.
   * Focus is not moved after a light dismiss: the user clicked or focused elsewhere on purpose.
   * @default true
   */
  restoreFocus?: boolean;

  /**
   * Remove the element from the DOM once closed and its exit animations finish.
   * @default true
   */
  unmountOnClose?: boolean;

  /**
   * `modal` only. Keep the dialog open on Escape and report it through `onClose`, so the consumer decides
   * whether to close. By default the browser closes the dialog and `onClose` reports it afterwards.
   * @default false
   */
  preventEscapeClose?: boolean;
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
 * - Waits for enter and exit animations, keeps the element mounted and inert while it exits.
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
  const { open, mode, role, restoreFocus = true, unmountOnClose = true, preventEscapeClose = false } = options;

  const [phase, setPhase] = React.useState<TopLayerPhase>(open ? 'entering' : 'closed');

  if (open && (phase === 'closed' || phase === 'exiting')) {
    setPhase('entering');
  } else if (!open && (phase === 'entering' || phase === 'open')) {
    setPhase('exiting');
  }

  const shouldRender = phase !== 'closed' || open || !unmountOnClose;

  const openRef = React.useRef(open);

  useIsomorphicLayoutEffect(() => {
    openRef.current = open;
  }, [open]);

  const previouslyFocusedElement = React.useRef<HTMLElement | null>(null);
  const escapePressed = React.useRef(false);
  const escapeClosedNestedPopover = React.useRef(false);
  const modalCancelled = React.useRef(false);

  const restoreFocusIfLost = useEventCallback((element: HTMLElement) => {
    const elementToFocus = previouslyFocusedElement.current;
    previouslyFocusedElement.current = null;
    if (!restoreFocus || !elementToFocus?.isConnected) {
      return;
    }
    const activeElement = element.ownerDocument.activeElement;
    if (!activeElement || activeElement === element.ownerDocument.body || element.contains(activeElement)) {
      elementToFocus.focus({ preventScroll: true });
    }
  });

  const reportClose = useEventCallback((data: TopLayerCloseData) => {
    if (openRef.current) {
      options.onClose?.(data);
    }
  });

  const warnedNativeOpen = React.useRef(false);

  const handleBeforeToggle = useEventCallback((event: Event) => {
    // A native open (invoker): snapshot focus before the browser moves it.
    if ((event as ToggleEvent).newState === 'open' && !openRef.current) {
      const element = event.currentTarget as HTMLElement;
      previouslyFocusedElement.current = element.ownerDocument.activeElement as HTMLElement | null;
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

    const type = escapePressed.current ? 'escape' : 'light-dismiss';
    escapePressed.current = false;
    if (openRef.current) {
      if (type === 'escape') {
        restoreFocusIfLost(element);
      } else {
        previouslyFocusedElement.current = null;
      }
    }
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
    // WebKit fires `cancel` on a modal dialog even when Escape closed a popover nested in it.
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
    if (preventEscapeClose) {
      event.preventDefault();
      reportClose({ type: 'escape', event });
      return;
    }
    // The browser closes the dialog; `close` reports it.
    modalCancelled.current = true;
  });

  const handleClose = useEventCallback((event: Event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    // Escape (after an allowed `cancel`), a form with `method="dialog"`, or a forced close after repeated Escape.
    const type = modalCancelled.current ? 'escape' : 'native-close';
    modalCancelled.current = false;
    reportClose({ type, event });
  });

  const handleFocusWrap = useEventCallback((event: KeyboardEvent) => {
    const element = event.currentTarget as HTMLElement;
    if (event.key !== 'Tab' || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    const activeElement = element.ownerDocument.activeElement;
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

  // Listeners are bound before the show/hide effect runs, so events dispatched synchronously by show are observed.
  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    if (!element || !shouldRender) {
      return;
    }
    const ownerDocument = element.ownerDocument;

    // Unsupported `hint` reflects as `manual`. Patch the attribute after mount, before the element is shown,
    // so server and client render the same markup.
    if (mode === 'hint' && element.getAttribute('popover') === 'hint' && !supportsPopoverHint(ownerDocument)) {
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
    } else {
      listen(element, 'beforetoggle', handleBeforeToggle);
      listen(element, 'toggle', handleToggle);
    }

    if (wrapsFocus) {
      listen(element, 'keydown', handleFocusWrap as EventListener, true);
    }

    return () => cleanups.forEach(cleanup => cleanup());
  }, [
    elementRef,
    mode,
    shouldRender,
    wrapsFocus,
    handleCancel,
    handleClose,
    handleDocumentKeyDown,
    handleDocumentKeyUp,
    handleFocusWrap,
    handleBeforeToggle,
    handleToggle,
  ]);

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    if (open) {
      const ownerDocument = element.ownerDocument;
      // Also covers an element the browser opened natively while it was still inert from its last exit.
      setInert(element, false);
      if (!isInTopLayer(element)) {
        previouslyFocusedElement.current = ownerDocument.activeElement as HTMLElement | null;
        escapePressed.current = false;
        modalCancelled.current = false;
      }

      // Modal dialogs focus their content natively; popovers only honour `autofocus`.
      if (show(element, mode) && mode !== 'modal' && !element.contains(ownerDocument.activeElement)) {
        getInitialFocusTarget(element, role)?.focus();
      }

      if (phase === 'entering') {
        return waitForAnimations(element, () => setPhase('open'));
      }
      return;
    }

    const focusWasInside = element.contains(element.ownerDocument.activeElement);
    const wasShown = isInTopLayer(element);
    hide(element);

    if (focusWasInside) {
      restoreFocusIfLost(element);
    } else if (wasShown) {
      previouslyFocusedElement.current = null;
    }

    if (phase !== 'exiting') {
      return;
    }

    queueMicrotask(() => {
      if (!isInTopLayer(element)) {
        setInert(element, true);
      }
    });

    return waitForAnimations(element, () => setPhase('closed'));
  }, [elementRef, open, phase, mode, role, restoreFocusIfLost]);

  return {
    shouldRender,
    phase,
    popover: mode === 'modal' ? undefined : mode,
  };
};
