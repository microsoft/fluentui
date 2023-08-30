import { canUseDOM } from '../ssr/canUseDOM';
import { useBrowserTimer } from './useBrowserTimer';

const setAnimationFrameNoop = (callback: FrameRequestCallback) => {
  callback(0);
  return 0;
};
const cancelAnimationFrameNoop = (handle: number) => handle;

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

  // TODO: figure it out a way to not call global.requestAnimationFrame and instead infer window from some context
  const setAnimationFrame = isDOM ? requestAnimationFrame : setAnimationFrameNoop;
  const clearAnimationFrame = isDOM ? cancelAnimationFrame : cancelAnimationFrameNoop;

  return useBrowserTimer(setAnimationFrame, clearAnimationFrame);
}
