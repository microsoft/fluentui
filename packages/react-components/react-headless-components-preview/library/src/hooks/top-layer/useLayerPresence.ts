'use client';

import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { isDialogElement, isInTopLayer, waitForAnimations } from './utils';
import { useElementListeners } from './useElementListeners';
import type { ToggleEvent, UseLayerPresenceOptions, UseLayerPresenceReturn } from './types';

const CLOSE_EVENTS = ['close', 'toggle'];
const getCloseEvents = () => CLOSE_EVENTS;

const getCloseEvent = (element: HTMLElement) => (isDialogElement(element) && element.open ? 'close' : 'toggle');

const isCloseEvent = (event: Event, element: HTMLElement) =>
  event.target === element && !isInTopLayer(element) && (event as ToggleEvent).newState !== 'open';

/**
 * Waits for `closeEvent`, when given, then for the exit animations, and calls `onExited`. Returns a cancel function.
 */
const waitForExit = (element: HTMLElement, closeEvent: string | null, onExited: () => void): (() => void) => {
  let cancel: () => void = () => undefined;

  const waitForClose = (type: string) => {
    const onClose = (event: Event) => {
      if (isCloseEvent(event, element)) {
        element.removeEventListener(type, onClose);
        waitForEnd();
      }
    };
    element.addEventListener(type, onClose);
    cancel = () => element.removeEventListener(type, onClose);
  };

  const waitForEnd = () => {
    let done = false;
    const cancelAnimations = waitForAnimations(element, () => {
      done = true;
      if (isInTopLayer(element)) {
        waitForClose(getCloseEvent(element));
      } else {
        onExited();
      }
    });
    if (!done) {
      cancel = cancelAnimations;
    }
  };

  if (closeEvent) {
    waitForClose(closeEvent);
  } else {
    waitForEnd();
  }
  return () => cancel();
};

/**
 * Whether to render an element. Keeps a closing element mounted until its close event has fired and its exit animations
 * end, so the element's own `onClose` / `onToggle` still run and it can animate out.
 *
 * - `open` turning false is tracked during render, so the element is still rendered in that render.
 * - `close()` and `hidePopover()` queue their event. The event to wait for is recorded on every commit the element is
 *   shown, so a switch to modal updates it: in that commit when the open-state hook is declared first, otherwise in a
 *   microtask after the opening one. A close in the same commit records it before the open-state hook hides the element. An open `<dialog>` fires `toggle` before `close`,
 *   so it waits for `close`; a queued `toggle` from the opening can still arrive after a close and is ignored.
 * - A capture listener runs before the open-state hook's: it drops the pending event when the browser closed the
 *   element with that event, and updates it when the element is shown again, e.g. as a modal.
 * - The browser can reopen the element during its exit (a native invoker, `showPopover()`) and cancel the exit
 *   animations: it then stays mounted until it closes again or `open` turns true.
 * - An exit ends when `open` turns true, the exit finishes, the exiting element is replaced or removed, or on unmount.
 */
export const useLayerPresence = (
  ref: React.RefObject<HTMLElement | null>,
  options: UseLayerPresenceOptions,
): UseLayerPresenceReturn => {
  const { open, unmountOnClose = true } = options;

  const [prevOpen, setPrevOpen] = React.useState(open);
  const [exitPending, setExitPending] = React.useState(false);
  if (prevOpen !== open) {
    setPrevOpen(open);
    setExitPending(!open && unmountOnClose);
  }

  const openRef = React.useRef(false);
  const exitingElement = React.useRef<HTMLElement | null>(null);
  const pendingCloseEvent = React.useRef<{ element: HTMLElement; type: string } | null>(null);

  const onLayerEvent = useEventCallback((event: Event) => {
    const element = event.currentTarget as HTMLElement;
    const pending = pendingCloseEvent.current;
    if (pending?.element !== element || event.target !== element) {
      return;
    }
    if (isCloseEvent(event, element)) {
      if (event.type === pending.type) {
        pendingCloseEvent.current = null;
      }
    } else if (isInTopLayer(element)) {
      pending.type = getCloseEvent(element);
    }
  });
  useElementListeners(ref, onLayerEvent, getCloseEvents, true);

  const recordCloseEvent = (element: HTMLElement) => {
    pendingCloseEvent.current = { element, type: getCloseEvent(element) };
  };

  useIsomorphicLayoutEffect(() => {
    openRef.current = open;
    if (!open || !unmountOnClose) {
      return;
    }
    if (ref.current && isInTopLayer(ref.current)) {
      recordCloseEvent(ref.current);
      return;
    }
    if (pendingCloseEvent.current?.element === ref.current) {
      return;
    }
    queueMicrotask(() => {
      const element = ref.current;
      if (openRef.current && element && isInTopLayer(element)) {
        recordCloseEvent(element);
      }
    });
  });

  const endExit = () => setExitPending(false);

  useIsomorphicLayoutEffect(() => {
    if (exitingElement.current && exitingElement.current !== ref.current) {
      endExit();
    }
  });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!exitPending) {
      return;
    }
    if (!element) {
      endExit();
      return;
    }

    if (isInTopLayer(element)) {
      recordCloseEvent(element);
    }

    exitingElement.current = element;
    let cancel: (() => void) | undefined;
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) {
        return;
      }
      const pending = pendingCloseEvent.current?.element === element ? pendingCloseEvent.current : null;
      pendingCloseEvent.current = null;
      cancel = waitForExit(element, pending?.type ?? null, endExit);
    });

    return () => {
      cancelled = true;
      cancel?.();
      exitingElement.current = null;
    };
  }, [ref, exitPending]);

  return { shouldRender: open || exitPending || !unmountOnClose };
};
