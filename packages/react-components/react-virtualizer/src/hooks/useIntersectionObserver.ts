import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

const { useState, useRef } = React;

/**
 * React hook that allows easy usage of the browser API IntersectionObserver within React
 * @param callback - A function called when the percentage of the target element is visible crosses a threshold.
 * @param options - An optional object which customizes the observer. If options isn't specified, the observer uses the
 * document's viewport as the root, with no margin, and a 0% threshold (meaning that even a one-pixel change is
 * enough to trigger a callback).
 * @returns An array containing a callback to update the list of Elements the observer should listen to, a callback to
 * update the init options of the IntersectionObserver and a ref to the IntersectionObserver instance itself.
 */

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
): {
  setObserverList: Dispatch<SetStateAction<Element[] | undefined>>;
  setObserverInit: Dispatch<SetStateAction<IntersectionObserverInit | undefined>>;
  observer: MutableRefObject<IntersectionObserver | undefined>;
} => {
  const observer = useRef<IntersectionObserver>();
  const [observerList, setObserverList] = useState<Element[]>();
  const [observerInit, setObserverInit] = useState<IntersectionObserverInit | undefined>(options);

  // Observer elements in passed in list and clean up previous list
  // This effect is only triggered when observerList is updated
  useIsomorphicLayoutEffect(() => {
    observer.current = new IntersectionObserver(callback, observerInit);

    // If we have an instance of IO and a list with elements, observer the elements
    if (observer.current && observerList && observerList.length > 0) {
      observerList.forEach(element => {
        observer.current?.observe(element);
      });
    }

    // clean up previous elements being listened to
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [observerList, observerInit, callback]);

  return { setObserverList, setObserverInit, observer };
};
