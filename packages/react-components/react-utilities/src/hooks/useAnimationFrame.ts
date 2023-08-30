import { canUseDOM } from '../ssr/canUseDOM';
import { useBrowserTimer } from './useBrowserTimer';

/**
 * @internal
 * Helper to manage a browser requestAnimationFrame.
 * Ensures that the requestAnimationFrame isn't set multiple times at once and is cleaned up
 * when the component is unloaded.
 *
 * @returns A pair of [requestAnimationFrame, cancelAnimationFrame] that are stable between renders.
 */
export function useAnimationFrame() {
  const isDOM = canUseDOM();
  const noop = () => 0;

  // TODO: figure it out a way to not call global.requestAnimationFrame and instead infer window from some context
  const setAnimationFrame = isDOM ? requestAnimationFrame : noop;
  const clearAnimationFrame = isDOM ? cancelAnimationFrame : noop;

  return useBrowserTimer(setAnimationFrame, clearAnimationFrame);
}
