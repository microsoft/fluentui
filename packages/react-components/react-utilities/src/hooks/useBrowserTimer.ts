import * as React from 'react';

type UseBrowserTimerSetter =
  | ((fn: () => void, duration?: number, ...args: Record<string, unknown>[]) => number)
  | ((fn: () => void) => number);
type UseBrowserTimerCancel = ((timerId: number) => void) | (() => void);

/**
 * @internal
 * Helper to manage a browser timer.
 * Ensures that the timer isn't set multiple times at once,
 * and is cleaned up when the component is unloaded.
 *
 * @param setTimer - The timer setter function
 * @param cancelTimer - The timer cancel function
 * @returns A pair of [setTimer, cancelTimer] that are stable between renders.
 *
 * @example
 * const [setTimer, cancelTimer] = useBrowserTimer(setTimeout, cancelTimeout);
 *
 * setTimer(() => console.log('Hello world!'), 1000);
 * cancelTimer();
 */
export function useBrowserTimer<TSetter extends UseBrowserTimerSetter, TCancel extends UseBrowserTimerCancel>(
  setTimer: TSetter,
  cancelTimer: TCancel,
) {
  const [timeout] = React.useState(() => ({
    id: undefined as number | undefined,
    set: (fn: () => void, delay?: number) => {
      timeout.cancel();
      timeout.id = delay ? setTimer(fn, delay) : setTimer(fn);
      return timeout.id;
    },
    cancel: () => {
      if (timeout.id !== undefined) {
        cancelTimer(timeout.id);
        timeout.id = undefined;
      }
    },
  }));

  // Clean up the timeout when the component is unloaded
  React.useEffect(() => timeout.cancel, [timeout]);

  return [timeout.set, timeout.cancel] as const;
}
