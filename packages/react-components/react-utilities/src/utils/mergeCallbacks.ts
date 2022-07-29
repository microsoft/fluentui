/**
 * @internal
 * Combine two event callbacks into a single callback function that calls each one in order.
 *
 * This is useful to add an event listener to an existing element without overwriting the current listener, if any.
 *
 * If you need a callback that is stable between renders, wrap the result in {@link useEventCallback}.
 *
 * For example:
 * ```ts
 * state.slot.onChange = useEventCallback(mergeCallbacks(state.slot.onChange, ev => {
 *   // Handle onChange
 * }));
 * ```
 *
 * @param callback1 - The first callback to be called, or undefined
 * @param callback2 - The second callback to be called, or undefined
 *
 * @returns A function that that calls the provided functions in order
 */
export function mergeCallbacks<Args extends unknown[]>(
  callback1: ((...args: Args) => void) | undefined,
  callback2: ((...args: Args) => void) | undefined,
) {
  return (...args: Args) => {
    callback1?.(...args);
    callback2?.(...args);
  };
}
