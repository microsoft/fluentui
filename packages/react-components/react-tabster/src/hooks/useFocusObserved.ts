'use client';

import * as React from 'react';
import { requestFocusObservedElement } from 'tabster/lite/observed';

interface UseFocusObservedOptions {
  /**
   * After timeout the focus attempt fails
   */
  timeout?: number;
}

interface FocusObservedRequest {
  result: Promise<boolean>;
  cancel: () => void;
}

/**
 * @param name - The observed element to focus
 * @param options - Options for the focus observed
 *
 * @returns Function that will focus an element
 */
export function useFocusObserved(name: string, options: UseFocusObservedOptions = {}): () => FocusObservedRequest {
  const { timeout = 1000 } = options;

  return React.useCallback(() => {
    const request = requestFocusObservedElement(name, { timeout });
    return {
      result: request.result.then(el => el !== null),
      cancel: () => request.cancel(),
    };
  }, [name, timeout]);
}
