/**
 * @internal
 * Combine two event callbacks into a single callback function that calls each one in order.
 *
 * Usage example:
 * ```ts
 * state.slot.onChange = mergeCallbacks(state.slot.onChange, ev => {
 *   // Handle onChange
 * });
 * ```
 *
 * The primary use is to avoid the need to capture an existing callback (`state.slot.onChange` in the example) to a
 * local variable before replacing with a new listener that calls the existing one. This helps avoid bugs like:
 * * Infinite recursion by calling the re-assigned state.slot.onChange if it's not captured to a local variable.
 * * Missing a call to the original onChange due to an early return or other conditional.
 *
 * If you need a callback that is stable between renders, wrap the result in {@link useEventCallback}.
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
