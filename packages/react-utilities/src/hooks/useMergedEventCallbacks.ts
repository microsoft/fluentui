import { useEventCallback } from './useEventCallback';

/**
 * Combine multiple event callbacks into a single callback function that calls each one in order.
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
 * @param callbacks - The set of callbacks to be called
 */
export function useMergedEventCallbacks<Args extends unknown[]>(
  ...callbacks: (((...args: Args) => void) | undefined)[]
) {
  return useEventCallback((...args: Args) => callbacks.forEach(callback => callback?.(...args)));
}
