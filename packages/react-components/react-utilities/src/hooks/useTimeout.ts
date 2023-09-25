import { useBrowserTimer } from './useBrowserTimer';

/**
 * @internal
 * Helper to manage a browser timeout.
 * Ensures that the timeout isn't set multiple times at once and is cleaned up
 * when the component is unloaded.
 *
 * @returns A pair of [setTimeout, clearTimeout] that are stable between renders.
 */
export function useTimeout() {
  // TODO: figure it out a way to not call global.setTimeout and instead infer window from some context
  return useBrowserTimer(setTimeout, clearTimeout);
}
