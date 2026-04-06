'use client';

import * as React from 'react';
import { useTabster } from './useTabster';
import type { ObservedRequest } from '../focus-navigation/navigationManager';

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
 * @returns Function that will focus an element by its registered name
 */
export function useFocusObserved(name: string, options: UseFocusObservedOptions = {}): () => ObservedRequest {
  const { timeout = 1000 } = options;
  const managerRef = useTabster();

  return React.useCallback(() => {
    const manager = managerRef.current;
    if (manager) {
      return manager.requestFocusObserved(name, timeout);
    }
    return {
      result: Promise.resolve(false),
      cancel: () => undefined,
    };
  }, [managerRef, name, timeout]);
}
