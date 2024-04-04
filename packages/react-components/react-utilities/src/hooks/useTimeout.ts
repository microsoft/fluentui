import { useBrowserTimer } from './useBrowserTimer';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

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
  // eslint-disable-next-line no-restricted-globals
  const win = targetDocument?.defaultView ?? window;

  return useBrowserTimer(win.setTimeout, win.clearTimeout);
}
