import { useBrowserTimer } from './useBrowserTimer';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

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
  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;

  const setAnimationFrame = win ? win.requestAnimationFrame : setAnimationFrameNoop;
  const clearAnimationFrame = win ? win.cancelAnimationFrame : cancelAnimationFrameNoop;

  return useBrowserTimer(setAnimationFrame, clearAnimationFrame);
}
