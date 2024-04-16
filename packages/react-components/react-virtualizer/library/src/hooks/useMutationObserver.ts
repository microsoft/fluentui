import type { MutableRefObject } from 'react';
import * as React from 'react';

const { useRef, useEffect } = React;

export const useMutationObserver = (
  target: Element | Document | undefined,
  callback: MutationCallback,
  options?: MutationObserverInit,
): {
  observer: MutableRefObject<MutationObserver | undefined>;
} => {
  const observer = useRef<MutationObserver>();

  useEffect(() => {
    // Create an observer instance linked to the callback function
    observer.current = new MutationObserver(callback);
  }, [callback]);

  useEffect(() => {
    if (target) {
      // Start observing the target node for configured mutations
      observer.current?.observe(target, options);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [target, options]);

  return { observer };
};
