import { useBrowserTimer } from './useBrowserTimer';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

const setTimeoutNoop = (callback: Function) => {
  callback();
  return 0;
};

const clearTimeoutNoop = (handle: number) => handle;

/**
 * @internal
 * Helper to manage a browser timeout.
 * Ensures that the timeout isn't set multiple times at once and is cleaned up
 * when the component is unloaded.
 *
 * @returns A pair of [setTimeout, clearTimeout] that are stable between renders.
 */
export function useTimeout() {
  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;

  const setTimerFn = win ? win.setTimeout : setTimeoutNoop;
  const clearTimerFn = win ? win.clearTimeout : clearTimeoutNoop;

  return useBrowserTimer(setTimerFn, clearTimerFn);
}
