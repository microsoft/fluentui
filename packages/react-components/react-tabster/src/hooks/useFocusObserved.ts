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
 * @param name - The observed element to focus
 * @param options - Options for the focus observed
 *
 * @returns Function that will focus an element
 */
export function useFocusObserved(
  name: string,
  options: UseFocusObservedOptions = {},
): () => TabsterTypes.ObservedElementAsyncRequest<boolean> {
  const { timeout = 1000 } = options;
  const observedAPIRef = useTabster(getObservedElement);

  return React.useCallback(() => {
    const observerAPI = observedAPIRef.current;

    if (observerAPI) {
      return observerAPI.requestFocus(name, timeout);
    }

    return {
      result: Promise.resolve(false),
      cancel: () => null,
    };
  }, [observedAPIRef, name, timeout]);
}
