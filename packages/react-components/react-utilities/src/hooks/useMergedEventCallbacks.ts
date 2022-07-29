import { useEventCallback } from './useEventCallback';
import { mergeCallbacks } from '../utils/mergeCallbacks';

/**
 * @internal
 * @deprecated useEventCallback(mergeCallbacks(callback1, callback2))
 */
export function useMergedEventCallbacks<Args extends unknown[]>(
  callback1: ((...args: Args) => void) | undefined,
  callback2: ((...args: Args) => void) | undefined,
) {
  return useEventCallback(mergeCallbacks(callback1, callback2));
}
