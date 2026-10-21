'use client';

import * as React from 'react';
import { Escape } from '@fluentui/keyboard-keys';
import { useEventCallback, useForceUpdate, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import {
  getPopoverMode,
  hasOpenNestedPopover,
  isDialogElement,
  isEscapeForLayer,
  isInTopLayer,
  isPopoverOpen,
  waitForAnimations,
} from '../../utils/topLayer';
import type { ToggleEvent } from '../../utils/topLayer';
import {
  getInitialFocusTarget,
  hide,
  log,
  setInert,
  showModal,
  showPopover,
  usesDialogEvents,
} from './topLayerActions';
import { useElementListeners } from './useElementListeners';
import { useTopLayerExit } from './useTopLayerExit';
import { useTopLayerFocus } from './useTopLayerFocus';
import type { TopLayerOpenChangeData, TopLayerPhase } from './TopLayer.types';
import type { UseTopLayerOptions, UseTopLayerReturn } from './useTopLayer.types';

const getPhase = (open: boolean, entering: boolean, exiting: boolean): TopLayerPhase => {
  if (open) {
    return entering ? 'entering' : 'open';
  }

  return exiting ? 'exiting' : 'closed';
};

/**
 * Keeps an element in the browser top layer in sync with `open`, using the Popover API or a modal `<dialog>`.
 * Reports browser opens and closes, returns focus where the browser does not, and keeps a closing element mounted
 * and inert until its exit ends. The element is not moved in the DOM. No positioning; compose with `usePositioning`.
 *
 * @example
 * ```tsx
 * const ref = React.useRef<HTMLDivElement>(null);
 * const { shouldRender, popover, onKeyDown } = useTopLayer(ref, { open, mode: 'auto', onOpenChange: setOpen });
 * return shouldRender ? <div ref={ref} popover={popover} onKeyDown={onKeyDown} role="menu" aria-label="Actions" /> : null;
 * ```
 */
export const useTopLayer = (
  ref: React.RefObject<HTMLElement | null>,
  options: UseTopLayerOptions,
): UseTopLayerReturn => {
  const { open, mode, returnFocus = true, unmountOnClose = true, preventEscapeClose = false } = options;
  const modal = mode === 'modal';
  const popover = modal ? undefined : mode;

  // Set during render, so the element is still rendered in the render where `open` turns false.
  const [prevOpen, setPrevOpen] = React.useState(open);
  const [exitPending, setExitPending] = React.useState(false);
  if (prevOpen !== open) {
    setPrevOpen(open);
    setExitPending(!open);
  }

  const [entering, setEntering] = React.useState(false);
  const [syncToken, resync] = React.useReducer((count: number) => count + 1, 0);
  const scheduleDevCloseCheck = useForceUpdate();

  const shouldRender = open || exitPending || !unmountOnClose;
  const phase = getPhase(open, entering, exitPending);

  const focus = useTopLayerFocus(returnFocus);
  const exit = useTopLayerExit(() => setExitPending(false));

  const openRef = React.useRef(false);
  const shownElement = React.useRef<HTMLElement | null | undefined>(undefined);
  const shownPopoverMode = React.useRef<string | null>(null);
  const escape = React.useRef({
    pressed: false,
    handled: false,
    closedNestedPopover: false,
    cancelEvent: null as Event | null,
  });
  const warnedNativeOpen = React.useRef(false);
  const devCloseCheckPending = React.useRef(false);

  // The browser closed the element. Return focus now too, since `open` may never change.
  const reportNativeClose = (element: HTMLElement, data: TopLayerOpenChangeData) => {
    if (!openRef.current) {
      return;
    }
    options.onOpenChange?.(false, data);
    // After the consumer's update: React 17 renders synchronously inside native listeners.
    if (process.env.NODE_ENV !== 'production') {
      devCloseCheckPending.current = true;
      scheduleDevCloseCheck();
    }
    focus.restoreFocus(element);
  };

  const handleBeforeToggle = useEventCallback((event: Event) => {
    const element = event.currentTarget as HTMLElement;
    if ((event as ToggleEvent).newState === 'closed') {
      focus.trackFocusOnClose(element);
      return;
    }

    shownPopoverMode.current = element.getAttribute('popover');
    if (!openRef.current) {
      focus.rememberPrevious(element);
    }
  });

  const handleToggle = useEventCallback((event: Event) => {
    const element = event.currentTarget as HTMLElement;
    const newState = (event as ToggleEvent).newState;
    if ((newState === 'open') !== isInTopLayer(element)) {
      return;
    }

    if (newState === 'open') {
      if (openRef.current) {
        return;
      }
      if (options.onOpenChange) {
        options.onOpenChange(true, { type: 'native-open', event });
      } else if (process.env.NODE_ENV !== 'production' && !warnedNativeOpen.current) {
        warnedNativeOpen.current = true;
        log(
          'warn',
          'the browser opened a top-layer element while `open` is false (e.g. a `popovertarget` invoker). ' +
            'Pass `onOpenChange` to sync it into React state.',
        );
      }
      // Hidden again unless `open` became true.
      resync();
      return;
    }

    // A dialog's close is reported by its `close` event.
    if (usesDialogEvents(element, modal)) {
      return;
    }

    // The `popover` attribute changed while open and the browser hid the element; show it again.
    if (openRef.current && element.getAttribute('popover') !== shownPopoverMode.current) {
      resync();
      return;
    }

    const type = escape.current.pressed ? 'escape' : 'light-dismiss';
    escape.current.pressed = false;
    reportNativeClose(element, { type, event });
  });

  const handleDocumentKeyDown = useEventCallback((event: KeyboardEvent) => {
    const element = ref.current;

    if (event.key !== Escape || !element) {
      return;
    }

    const nestedOpen = hasOpenNestedPopover(element);
    escape.current.pressed = !nestedOpen && isPopoverOpen(element);
    escape.current.closedNestedPopover = nestedOpen;
  });

  const handleDocumentKeyUp = useEventCallback((event: KeyboardEvent) => {
    if (event.key === Escape) {
      escape.current.pressed = false;
      escape.current.handled = false;
      escape.current.closedNestedPopover = false;
    }
  });

  const handleCancel = useEventCallback((event: Event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (escape.current.closedNestedPopover) {
      escape.current.closedNestedPopover = false;
      event.preventDefault();
      return;
    }
    focus.trackFocusOnClose(event.currentTarget as HTMLElement);
    if (preventEscapeClose) {
      event.preventDefault();
      // `onKeyDown` already reported this Escape and the consumer kept the dialog open.
      if (escape.current.handled) {
        escape.current.handled = false;
        return;
      }
      if (openRef.current) {
        options.onOpenChange?.(false, { type: 'escape', event });
      }
      return;
    }
    escape.current.cancelEvent = event;
  });

  const handleClose = useEventCallback((event: Event) => {
    const element = event.currentTarget as HTMLElement;
    if (event.target !== element || (isDialogElement(element) && element.open)) {
      return;
    }
    const { cancelEvent } = escape.current;
    const type = cancelEvent && !cancelEvent.defaultPrevented ? 'escape' : 'native-close';
    escape.current.cancelEvent = null;
    reportNativeClose(element, { type, event });
  });

  const onKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLElement>) => {
    const element = ref.current;
    if (event.key !== Escape || event.isDefaultPrevented() || !element || !openRef.current || !isInTopLayer(element)) {
      return;
    }

    // Unsupported `hint` keeps the attribute but reflects as `manual`. Without the Popover API, a `<dialog>` falls back
    // to `show()`, which Escape doesn't close.
    const browserCloses = modal
      ? !preventEscapeClose
      : typeof element.showPopover === 'function' && getPopoverMode(element) !== 'manual';
    if (browserCloses || !isEscapeForLayer(element, event.target as Element)) {
      return;
    }

    escape.current.handled = true;
    focus.trackFocusOnClose(element);
    options.onOpenChange?.(false, { type: 'escape', event });
    event.preventDefault();
    event.stopPropagation();
  });

  // Checks after every commit, since a ref does not say when its element changes.
  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    exit.settleIfReplaced(element);

    if (open && openRef.current && shownElement.current !== undefined && element !== shownElement.current) {
      resync();
    }

    if (process.env.NODE_ENV !== 'production' && devCloseCheckPending.current) {
      devCloseCheckPending.current = false;
      if (open) {
        log(
          'warn',
          '`open` stayed true after `onOpenChange(false)`. The browser already closed the element, so it stays ' +
            'hidden until `open` changes.',
        );
      }
    }
  });

  // Dialogs fire `beforetoggle` and `toggle` too (Chromium 132+), which reports native modal opens.
  useElementListeners(ref, element => {
    const listeners = {
      beforetoggle: handleBeforeToggle,
      toggle: handleToggle,
      focusin: focus.handleFocusIn,
    };
    return usesDialogEvents(element, modal)
      ? { ...listeners, cancel: handleCancel, close: handleClose, focusout: focus.handleDialogFocusOut }
      : listeners;
  });

  // Only while open, so closed layers that stay mounted (Tooltip, Menu) hold no document listeners.
  const listenForEscape = (targetDocument: Document) => {
    const controller = new AbortController();
    const listenerOptions = { capture: true, signal: controller.signal };
    targetDocument.addEventListener('keydown', handleDocumentKeyDown, listenerOptions);
    targetDocument.addEventListener('keyup', handleDocumentKeyUp, listenerOptions);
    return () => controller.abort();
  };

  // `entering` until the enter animations end. Not set when none run, to skip a render.
  const trackEntering = (element: HTMLElement) => {
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
  };

  const enter = (element: HTMLElement | null, wasOpen: boolean) => {
    // First show of this element: after a closed commit, or a new element (late mount, changed `key`).
    const fresh = !wasOpen || shownElement.current !== element;
    shownElement.current = element;

    if (!element) {
      return;
    }

    setInert(element, false);

    if (!isInTopLayer(element)) {
      focus.rememberPrevious(element, { keepExisting: wasOpen });
      focus.resetCloseTracking();
      escape.current.pressed = false;
      escape.current.handled = false;
      escape.current.cancelEvent = null;
    }

    // Read before `show()`, which can move focus.
    const keepFocus = focus.getLastFocusedInside();
    const initialTarget = fresh ? getInitialFocusTarget(element, options.initialFocus) : null;
    const shown = popover ? showPopover(element, popover) : showModal(element);

    if (!fresh) {
      if (shown) {
        focus.keepFocusAfterSwitch(element, keepFocus);
      }
    } else if (shown || isInTopLayer(element)) {
      // A fresh show, or a browser open the consumer accepted.
      focus.focusOnShow(initialTarget);
      options.onShow?.(element);
    }

    const stopListening = listenForEscape(element.ownerDocument);
    const stopTracking = trackEntering(element);
    return () => {
      stopListening();
      stopTracking();
    };
  };

  const leave = (element: HTMLElement) => {
    focus.trackFocusOnClose(element, { keepExisting: true });

    const wasShown = isInTopLayer(element);
    const closeEventType = isPopoverOpen(element) ? 'toggle' : 'close';
    hide(element);
    focus.restoreFocus(element);
    exit.start(element, wasShown, closeEventType);
  };

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    const wasOpen = openRef.current;
    openRef.current = open;

    if (open) {
      exit.cancel();
      return enter(element, wasOpen);
    }

    if (!wasOpen) {
      if (element && !exit.isWaitingForNativeClose()) {
        hide(element);
      }
      return;
    }

    if (!element) {
      setExitPending(false);
      return;
    }

    leave(element);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, open, mode, syncToken]);

  return {
    shouldRender,
    phase,
    popover,
    onKeyDown,
  };
};
