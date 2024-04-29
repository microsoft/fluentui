import * as React from 'react';
import { getObservedElement, Types as TabsterTypes } from 'tabster';
import { useTabster } from './useTabster';

interface UseFocusObservedOptions {
  /**
   * After timeout the focus attempt fails
   */
  timeout?: number;
}

/**
 *
 * @param name - The observed element to focus
 * @returns Function that will focus the
 */
export function useFocusObserved(
  name: string,
  options: UseFocusObservedOptions = {},
): () => TabsterTypes.ObservedElementAsyncRequest<boolean> {
  const { timeout = 1000 } = options;
  const tabster = useTabster();

  const observedAPI = tabster ? getObservedElement(tabster) : null;

  return React.useCallback(() => {
    if (observedAPI) {
      return observedAPI.requestFocus(name, timeout);
    }

    return { result: Promise.resolve(false), cancel: () => null };
  }, [observedAPI, name, timeout]);
}
