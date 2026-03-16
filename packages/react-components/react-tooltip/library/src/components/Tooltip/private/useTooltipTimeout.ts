'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

const setTimeoutNoop = (_callback: Function) => -1;
const clearTimeoutNoop = (_handle: number) => undefined;

type BrowserTimerSetter =
  | ((fn: () => void, duration?: number, ...args: Record<string, unknown>[]) => number)
  | ((fn: () => void) => number);

/**
 * @internal
 * @param triggerElementRef - Reference to the trigger element
 * @returns A pair of [setTimeout, clearTimeout] that are stable between renders.
 */
export function useTooltipTimeout(
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  triggerElementRef: React.MutableRefObject<HTMLElement>,
): readonly [(fn: () => void, delay?: number) => number, () => void] {
  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;

  const setTimerFn: BrowserTimerSetter = win ? win.setTimeout : setTimeoutNoop;
  const clearTimerFn: (id: number) => void = win ? win.clearTimeout : clearTimeoutNoop;

  const id = React.useRef<number | undefined>(undefined);

  const set = React.useCallback(
    (fn: () => void, delay?: number) => {
      if (id.current !== undefined) {
        clearTimerFn(id.current);
      }

      id.current = setTimerFn(fn, delay ?? 0);
      return id.current;
    },
    [clearTimerFn, setTimerFn],
  );

  const cancel = React.useCallback(() => {
    if (id.current !== undefined) {
      clearTimerFn(id.current);
      id.current = undefined;
    }
  }, [clearTimerFn]);

  // StrictMode-aware cleanup: only clear timeout if element has no parent (real unmount)
  React.useEffect(() => {
    const el = triggerElementRef.current;
    return () => {
      const isRealUnmount = !el || !el.isConnected;

      if (isRealUnmount) {
        cancel();
      }
    };
  }, [cancel, triggerElementRef]);

  return [set, cancel];
}
