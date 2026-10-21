'use client';

import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { isInTopLayer, waitForAnimations } from '../../utils/topLayer';
import { setInert } from './topLayerActions';

type ExitStep = 'waitingForNativeClose' | 'waitingForAnimations';

type ExitState = Record<ExitStep, boolean> & {
  element: HTMLElement | null;
  cancel: () => void;
};

const createExitState = (): ExitState => ({
  element: null,
  waitingForNativeClose: false,
  waitingForAnimations: false,
  cancel: () => undefined,
});

export type TopLayerExit = {
  start: (element: HTMLElement, wasShown: boolean, closeEventType: 'close' | 'toggle') => void;
  cancel: () => void;
  isWaitingForNativeClose: () => boolean;
  settleIfReplaced: (element: HTMLElement | null) => void;
};

/**
 * Exit of a closing element: keeps it inert until the browser's close event and its exit animations both end, then
 * calls `onExited`.
 */
export const useTopLayerExit = (onExited: () => void): TopLayerExit => {
  const exit = React.useRef(createExitState());

  const settle = useEventCallback((step: ExitStep) => {
    if (!exit.current[step]) {
      return;
    }

    exit.current[step] = false;
    if (!exit.current.waitingForNativeClose && !exit.current.waitingForAnimations) {
      if (exit.current.element) {
        setInert(exit.current.element, false);
      }
      onExited();
    }
  });

  const cancel = () => {
    exit.current.cancel();
    exit.current = createExitState();
  };

  const isWaitingForNativeClose = () => exit.current.waitingForNativeClose;

  // The exiting element was replaced or removed, so its close event won't come.
  const settleIfReplaced = (element: HTMLElement | null) => {
    if (exit.current.waitingForNativeClose && exit.current.element !== element) {
      settle('waitingForNativeClose');
    }
  };

  /**
   * Starts the exit of an element the hook just hid. `closeEventType` is the event that confirms the browser hid it:
   * `close` for a dialog shown with `showModal()` or `show()`, `toggle` for a popover.
   */
  const start = (element: HTMLElement, wasShown: boolean, closeEventType: 'close' | 'toggle') => {
    queueMicrotask(() => {
      const { waitingForNativeClose, waitingForAnimations } = exit.current;
      if ((waitingForNativeClose || waitingForAnimations) && !isInTopLayer(element)) {
        setInert(element, true);
      }
    });

    cancel();

    // A listener of its own, so a mode change before the event arrives can't remove it.
    const controller = new AbortController();
    if (wasShown) {
      element.addEventListener(
        closeEventType,
        event => {
          if (event.target === element && !isInTopLayer(element)) {
            settle('waitingForNativeClose');
          }
        },
        { signal: controller.signal },
      );
    }

    exit.current.element = element;
    exit.current.waitingForNativeClose = wasShown;
    exit.current.waitingForAnimations = true;
    const cancelAnimations = waitForAnimations(element, () => settle('waitingForAnimations'));
    exit.current.cancel = () => {
      controller.abort();
      cancelAnimations();
    };
  };

  useIsomorphicLayoutEffect(() => () => exit.current.cancel(), []);

  return { start, cancel, isWaitingForNativeClose, settleIfReplaced };
};
