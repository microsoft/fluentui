'use client';

import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { isDialogElement, isInTopLayer, isPopoverOpen, waitForAnimations } from './utils';
import { useElementListeners } from './useElementListeners';
import { setInert } from './setInert';
import type { UseLayerPresenceOptions, UseLayerPresenceReturn } from './types';

type Exit = { element: HTMLElement | null; cancel: () => void };

const NO_EXIT: Exit = { element: null, cancel: () => undefined };

const CLOSE_EVENTS = ['close', 'toggle'];
const getCloseEvents = () => CLOSE_EVENTS;

// A modal `<dialog>` fires `toggle` before `close` where dialogs fire `toggle`, so wait for `close`.
const getCloseEvent = (element: HTMLElement) => (isDialogElement(element) && element.open ? 'close' : 'toggle');

// `close`, or a `toggle` to closed: a queued `toggle` from the opening can still arrive after a close.
const isCloseEvent = (event: Event, element: HTMLElement) =>
  event.target === element && !isInTopLayer(element) && (event as Event & { newState?: string }).newState !== 'open';

// Runs before all layout effects. React 17 has no insertion effects; there the layout effect order applies.
const useBeforeLayoutEffect = React.useInsertionEffect ?? useIsomorphicLayoutEffect;

/**
 * Whether to render an element. Keeps a closing element mounted and inert until it has left the top layer and its exit
 * animations end. Doesn't depend on `useLayerOpenState` running first: it measures animations after the commit, once
 * the element has been hidden.
 */
export const useLayerPresence = (
  ref: React.RefObject<HTMLElement | null>,
  options: UseLayerPresenceOptions,
): UseLayerPresenceReturn => {
  const { open, unmountOnClose = true } = options;

  // Set during render, so the element is still rendered in the render where `open` turns false.
  const [prevOpen, setPrevOpen] = React.useState(open);
  const [exitPending, setExitPending] = React.useState(false);
  if (prevOpen !== open) {
    setPrevOpen(open);
    setExitPending(!open);
  }

  const openRef = React.useRef(false);
  const exit = React.useRef<Exit>(NO_EXIT);
  // The event that ends the element's current opening, until it fires: `close()` and `hidePopover()` queue it.
  const pendingCloseEvent = React.useRef<{ element: HTMLElement; type: string } | null>(null);

  // The browser closed it: its close event has fired, so a React close after it has nothing to wait for. Capture runs
  // before the open-state hook reports the close, since the re-render can run between an event's listeners.
  const onCloseEvent = useEventCallback((event: Event) => {
    const element = event.currentTarget as HTMLElement;
    if (isCloseEvent(event, element) && pendingCloseEvent.current?.element === element) {
      pendingCloseEvent.current = null;
    }
  });
  useElementListeners(ref, onCloseEvent, getCloseEvents, true);

  // After the open-state hook has shown the element, wherever it is declared.
  useIsomorphicLayoutEffect(() => {
    if (!open) {
      return;
    }
    queueMicrotask(() => {
      const element = ref.current;
      if (openRef.current && element && isInTopLayer(element)) {
        pendingCloseEvent.current = { element, type: getCloseEvent(element) };
      }
    });
  });

  const endExit = (element: HTMLElement) => {
    exit.current.cancel();
    exit.current = NO_EXIT;
    setInert(element, false);
    setExitPending(false);
  };

  // A reopen during the exit: clear `inert` before the open-state hook shows the element, wherever it is declared, so
  // focus can move into it.
  useBeforeLayoutEffect(() => {
    if (open && exit.current.element) {
      setInert(exit.current.element, false);
    }
  }, [open]);

  // An exiting element that was replaced or removed won't finish its exit.
  useIsomorphicLayoutEffect(() => {
    const { element } = exit.current;
    if (element && element !== ref.current) {
      endExit(element);
    }
  });

  useIsomorphicLayoutEffect(
    () => () => {
      exit.current.cancel();
    },
    [],
  );

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    const wasOpen = openRef.current;
    openRef.current = open;

    if (open) {
      if (exit.current.element) {
        endExit(exit.current.element);
      }
      return;
    }

    if (!wasOpen) {
      return;
    }

    if (!element) {
      setExitPending(false);
      return;
    }

    const controller = new AbortController();
    let cancelAnimations = () => undefined as void;
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        endExit(element);
      }
    };

    const waitForExitAnimations = () => {
      cancelAnimations = waitForAnimations(element, finish);
      if (!done) {
        setInert(element, true);
      }
    };

    exit.current.cancel();
    exit.current = {
      element,
      cancel: () => {
        done = true;
        controller.abort();
        cancelAnimations();
      },
    };

    queueMicrotask(() => {
      if (done) {
        return;
      }
      const pending = pendingCloseEvent.current?.element === element ? pendingCloseEvent.current : null;
      pendingCloseEvent.current = null;
      if (!isInTopLayer(element) && !pending) {
        waitForExitAnimations();
        return;
      }

      // Still closing, or closed with its event queued: stay mounted for it, so the element's own handlers still run.
      element.addEventListener(
        pending?.type ?? (isPopoverOpen(element) ? 'toggle' : 'close'),
        event => {
          if (isCloseEvent(event, element)) {
            controller.abort();
            waitForExitAnimations();
          }
        },
        { signal: controller.signal },
      );
    });
  }, [ref, open]);

  return { shouldRender: open || exitPending || !unmountOnClose };
};
