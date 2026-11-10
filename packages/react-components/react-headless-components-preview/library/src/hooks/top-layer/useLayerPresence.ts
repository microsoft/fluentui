'use client';

import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { isDialogElement, isInTopLayer, waitForAnimations } from './utils';
import { useElementListeners } from './useElementListeners';
import type { ToggleEvent, UseLayerPresenceOptions, UseLayerPresenceReturn } from './types';

type Exit = { element: HTMLElement | null; cancel: () => void };

const NO_EXIT: Exit = { element: null, cancel: () => undefined };

const CLOSE_EVENTS = ['close', 'toggle'];
const getCloseEvents = () => CLOSE_EVENTS;

// An open `<dialog>` can fire `toggle` before `close`: wait for `close`.
const getCloseEvent = (element: HTMLElement) => (isDialogElement(element) && element.open ? 'close' : 'toggle');

// A queued `toggle` from the opening can still arrive after a close.
const isCloseEvent = (event: Event, element: HTMLElement) =>
  event.target === element && !isInTopLayer(element) && (event as ToggleEvent).newState !== 'open';

/**
 * Whether to render an element. Keeps a closing element mounted until its close event has fired and its exit animations
 * end. Order-independent with `useLayerOpenState`.
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
    setExitPending(!open && unmountOnClose);
  }

  const openRef = React.useRef(false);
  const exit = React.useRef<Exit>(NO_EXIT);
  // The event that ends the current opening: `close()` and `hidePopover()` queue it.
  const pendingCloseEvent = React.useRef<{ element: HTMLElement; type: string } | null>(null);

  // Capture: runs before the open-state hook's listener re-renders.
  const onLayerEvent = useEventCallback((event: Event) => {
    const element = event.currentTarget as HTMLElement;
    const pending = pendingCloseEvent.current;
    if (pending?.element !== element || event.target !== element) {
      return;
    }
    if (isCloseEvent(event, element)) {
      // The browser closed it: nothing left to wait for.
      pendingCloseEvent.current = null;
    } else if (isInTopLayer(element)) {
      // Shown again, e.g. as a modal.
      pending.type = getCloseEvent(element);
    }
  });
  useElementListeners(ref, onLayerEvent, getCloseEvents, true);

  const recordCloseEvent = (element: HTMLElement) => {
    pendingCloseEvent.current = { element, type: getCloseEvent(element) };
  };

  // Once the open-state hook has shown the element: already, when it is declared first; otherwise after this commit.
  useIsomorphicLayoutEffect(() => {
    if (!open || !unmountOnClose || pendingCloseEvent.current?.element === ref.current) {
      return;
    }
    if (ref.current && isInTopLayer(ref.current)) {
      recordCloseEvent(ref.current);
      return;
    }
    queueMicrotask(() => {
      const element = ref.current;
      if (openRef.current && element && isInTopLayer(element)) {
        recordCloseEvent(element);
      }
    });
  });

  const endExit = () => {
    exit.current.cancel();
    exit.current = NO_EXIT;
    setExitPending(false);
  };

  // An exiting element that was replaced or removed won't finish its exit.
  useIsomorphicLayoutEffect(() => {
    const { element } = exit.current;
    if (element && element !== ref.current) {
      endExit();
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
        endExit();
      }
      return;
    }

    if (!wasOpen || !unmountOnClose) {
      return;
    }

    if (!element) {
      setExitPending(false);
      return;
    }

    // Closed before the opening's microtask ran, and the open-state hook, declared later, hides it in this commit.
    if (pendingCloseEvent.current?.element !== element && isInTopLayer(element)) {
      recordCloseEvent(element);
    }

    let cancelWait: () => void = () => undefined;
    let cancelled = false;
    exit.current = {
      element,
      cancel: () => {
        cancelled = true;
        cancelWait();
      },
    };

    const waitForClose = (type: string) => {
      const onClose = (event: Event) => {
        if (isCloseEvent(event, element)) {
          element.removeEventListener(type, onClose);
          waitForExit();
        }
      };
      element.addEventListener(type, onClose);
      cancelWait = () => element.removeEventListener(type, onClose);
    };

    const waitForExit = () => {
      let done = false;
      const cancelAnimations = waitForAnimations(element, () => {
        done = true;
        // Reopened by the browser before React knows (a native invoker, `showPopover()`), which can also cancel the
        // exit animations: stay mounted until it closes again or `open` turns true.
        if (isInTopLayer(element)) {
          waitForClose(getCloseEvent(element));
        } else {
          endExit();
        }
      });
      if (!done) {
        cancelWait = cancelAnimations;
      }
    };

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }
      const pending = pendingCloseEvent.current?.element === element ? pendingCloseEvent.current : null;
      pendingCloseEvent.current = null;
      // Stay mounted for the queued close event, so the element's own `onClose` / `onToggle` run.
      if (pending) {
        waitForClose(pending.type);
      } else {
        waitForExit();
      }
    });
  }, [ref, open, unmountOnClose]);

  return { shouldRender: open || exitPending || !unmountOnClose };
};
