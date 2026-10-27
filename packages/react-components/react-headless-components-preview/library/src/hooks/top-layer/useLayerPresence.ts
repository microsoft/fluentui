'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { isInTopLayer, isPopoverOpen, waitForAnimations } from './utils';
import { setInert } from './setInert';
import type { UseLayerPresenceOptions, UseLayerPresenceReturn } from './types';

type Exit = { element: HTMLElement | null; cancel: () => void };

const NO_EXIT: Exit = { element: null, cancel: () => undefined };

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
      if (!isInTopLayer(element)) {
        waitForExitAnimations();
        return;
      }

      element.addEventListener(
        isPopoverOpen(element) ? 'toggle' : 'close',
        event => {
          if (event.target === element && !isInTopLayer(element)) {
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
