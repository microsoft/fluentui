import { useBrowserTimer } from './useBrowserTimer';

/**
 * @internal
 * Helper to manage a browser requestAnimationFrame.
 * Ensures that the requestAnimationFrame isn't set multiple times at once,
 * and is cleaned up when the component is unloaded.
 *
 * @returns A pair of [requestAnimationFrame, cancelAnimationFrame] that are stable between renders.
 */
export function useAnimationFrame() {
  return useBrowserTimer(requestAnimationFrame, cancelAnimationFrame);
}
