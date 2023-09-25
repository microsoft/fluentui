import * as React from 'react';
import { useConst } from './useConst';
import { useIsomorphicLayoutEffect } from '@fluentui/utilities';

/**
 * Modified `useCallback` that returns the same function reference every time, but internally calls
 * the most-recently passed callback implementation. Can be useful in situations such as:
 * - Event handler dependencies change too frequently, such as user props which might change on
 *   every render, or volatile values such as useState/useDispatch
 * - Callback must be referenced in a captured context (such as a window event handler or unmount
 *   handler that's registered once) but needs access to the latest props
 *
 * In general, prefer `useCallback` unless you've encountered one of the problems above.
 *
 * https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 *
 * @param fn - The callback function that will be used
 * @returns A function which is referentially stable but internally calls the most recently passed callback
 */
export function useEventCallback<Args extends unknown[], Return>(fn: (...args: Args) => Return) {
  const callbackRef = React.useRef<typeof fn>(() => {
    throw new Error('Cannot call an event handler while rendering');
  });

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = fn;
  }, [fn]);

  // useConst rather than useCallback to ensure the reference is always stable
  // (useCallback's deps list is an optimization, not a guarantee)
  return useConst(() => (...args: Args) => {
    const callback = callbackRef.current;
    return callback(...args);
  });
}
