'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { isInTopLayer, isPopoverOpen, waitForAnimations } from './utils';
import { setInert } from './setInert';
import type { TopLayerPhase, UseLayerPresenceOptions, UseLayerPresenceReturn } from './types';

const getPhase = (open: boolean, entering: boolean, exiting: boolean): TopLayerPhase => {
  if (open) {
    return entering ? 'entering' : 'open';
  }

  return exiting ? 'exiting' : 'closed';
};

type Exit = { element: HTMLElement | null; cancel: () => void };

const NO_EXIT: Exit = { element: null, cancel: () => undefined };

/**
 * Whether to render an element, and its animation phase. Keeps a closing element mounted and inert until it has left
 * the top layer and its exit animations end. Doesn't depend on `useLayerOpenState` running first: it measures
 * animations after the commit, once the element has been shown or hidden.
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
  const [entering, setEntering] = React.useState(false);

  const openRef = React.useRef(false);
  const exit = React.useRef<Exit>(NO_EXIT);

  const endExit = (element: HTMLElement) => {
    exit.current.cancel();
    exit.current = NO_EXIT;
    setInert(element, false);
    setExitPending(false);
  };

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
      if (!element) {
        return;
      }

      // After the commit, once the element has been shown, so its enter animations are running.
      let settled = false;
      let cancelEnter = () => undefined as void;
      let cancelled = false;
      queueMicrotask(() => {
        if (cancelled) {
          return;
        }
        let synchronous = true;
        cancelEnter = waitForAnimations(element, () => {
          settled = true;
          if (!synchronous) {
            setEntering(false);
          }
        });
        synchronous = false;
        if (!settled) {
          setEntering(true);
        }
      });

      return () => {
        cancelled = true;
        cancelEnter();
        if (!settled) {
          setEntering(false);
        }
      };
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
    // Inert only while exit animations run.
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

    // After the commit, once the element has been hidden, so its exit animations are running.
    queueMicrotask(() => {
      if (done) {
        return;
      }
      if (!isInTopLayer(element)) {
        waitForExitAnimations();
        return;
      }

      // Still shown: wait for the browser to report the close.
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

  return {
    shouldRender: open || exitPending || !unmountOnClose,
    phase: getPhase(open, entering, exitPending),
  };
};
