import { useEventCallback } from './useEventCallback';

/**
 * Combine two event callbacks into a single callback function that calls each one in order.
 *
 * This is useful to add an event listener to an existing element without overwriting the current listener, if any.
 *
 * For example:
 * ```ts
 * state.slot.onChange = useMergedCallbacks(state.slot.onChange, ev => {
 *   // Handle onChange
 * });
 * ```
 *
 * @param callback1 - The first callback to be called
 * @param callback2 - The second callback to be called
 *
 * @returns An event callback that calls the callbacks in order, and is stable between renders
 */
export function useMergedEventCallbacks<Args extends unknown[]>(
  callback1: ((...args: Args) => void) | undefined,
  callback2: ((...args: Args) => void) | undefined,
) {
  return useEventCallback((...args: Args) => {
    callback1?.(...args);
    callback2?.(...args);
  });
}
