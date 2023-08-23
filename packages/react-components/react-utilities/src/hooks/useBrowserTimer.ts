import * as React from 'react';

type BrowserTimerSetter =
  | ((fn: () => void, duration?: number, ...args: Record<string, unknown>[]) => number)
  | ((fn: () => void) => number);

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
export function useBrowserTimer(setTimer: BrowserTimerSetter, cancelTimer: (id: number) => void) {
  const id = React.useRef<number | undefined>(undefined);

  const set = React.useCallback(
    (fn: () => void, delay?: number) => {
      if (id.current !== undefined) {
        cancelTimer(id.current);
      }

      id.current = setTimer(fn, delay);
      return id.current;
    },
    [cancelTimer, setTimer],
  );

  const cancel = React.useCallback(() => {
    if (id.current !== undefined) {
      cancelTimer(id.current);
      id.current = undefined;
    }
  }, [cancelTimer]);

  // Clean up the timeout when the component is unloaded
  React.useEffect(() => cancel, [cancel]);

  return [set, cancel] as const;
}
