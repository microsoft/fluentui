import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

const { useCallback, useState, useRef } = React;
import { useMutationObserver } from './useMutationObserver';

/**
 * This function will take the rootMargin and flip the sides if we are in RTL based on the computed reading direction of the target element.
 * @param ltrRootMargin the margin to be processed and flipped if required
 * @param target target element that will have its current reading direction determined
 * @returns the corrected rootMargin (if it was necessary to correct)
 */
export const getRTLRootMargin = (
  ltrRootMargin: string,
  target?: Element | Document | null | undefined,
  win?: Window | null,
): string => {
  if (target && win) {
    // get the computed dir for the target element
    const newDir = win.getComputedStyle(target as Element).direction;

    // If we're in rtl reading direction, we might need to flip the margins on the left/right sides
    if (newDir === 'rtl') {
      let newMargin = ltrRootMargin;
      const splitMargins = ltrRootMargin.split(' ');

      // We only need to do this if we get four values, otherwise the sides are equal and don't require flipping.
      if (splitMargins.length === 4) {
        newMargin = `${splitMargins[0]} ${splitMargins[3]} ${splitMargins[2]} ${splitMargins[1]}`;
      }

      return newMargin;
    } else {
      return ltrRootMargin;
    }
  }

  return ltrRootMargin;
};

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
  setObserverInit: (newInit: IntersectionObserverInit | undefined) => void;
  // TODO: exclude types from this lint rule: https://github.com/microsoft/fluentui/issues/31286
  // eslint-disable-next-line no-restricted-globals
  observer: MutableRefObject<IntersectionObserver | undefined>;
} => {
  'use no memo';

  // TODO: exclude types from this lint rule: https://github.com/microsoft/fluentui/issues/31286
  // eslint-disable-next-line no-restricted-globals
  const observer = useRef<IntersectionObserver>();
  const [observerList, setObserverList] = useState<Element[]>();
  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;

  // set the initial init with corrected margins based on the observed root's calculated reading direction.
  const [observerInit, setObserverInit] = useState<IntersectionObserverInit | undefined>(
    options && {
      ...options,
      rootMargin: getRTLRootMargin(options.rootMargin ?? '0px', options.root as Element, win),
    },
  );

  // We have to assume that any values passed in for rootMargin by the consuming app are ltr values. As such we will store the ltr value.
  const ltrRootMargin = useRef<string>(options?.rootMargin ?? '0px');

  // Callback function to execute when mutations are observed
  const mutationObserverCallback: MutationCallback = useCallback(
    mutationList => {
      for (const mutation of mutationList) {
        // Ensuring that the right attribute is being observed and that the root is within the tree of the element being mutated.
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'dir' &&
          options?.root &&
          mutation.target.contains(options?.root)
        ) {
          setObserverInit({
            ...observerInit,
            rootMargin: getRTLRootMargin(ltrRootMargin.current, observerInit?.root, win),
          });
        }
      }
    },
    [ltrRootMargin, observerInit, options?.root, win],
  );

  // Mutation observer for dir attribute changes in the document
  useMutationObserver(targetDocument, mutationObserverCallback, {
    attributes: true,
    subtree: true,
    attributeFilter: ['dir'],
  });

  // Observer elements in passed in list and clean up previous list
  // This effect is only triggered when observerList is updated
  useIsomorphicLayoutEffect(() => {
    if (!win) {
      return;
    }

    observer.current = new win.IntersectionObserver(callback, {
      ...observerInit,
      rootMargin: getRTLRootMargin(ltrRootMargin.current, observerInit?.root, win),
    });

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
  }, [observerList, observerInit, callback, win]);

  // Do not use internally, we need to track external settings only here
  const setObserverInitExternal = useCallback(
    (newInit: IntersectionObserverInit | undefined) => {
      // Since we know this is coming from consumers, we can store this value as LTR somewhat safely.
      ltrRootMargin.current = newInit?.rootMargin ?? '0px';

      // Call the internal setter to update the value and ensure if our calculated direction is rtl, we flip the margin
      setObserverInit({
        ...newInit,
        rootMargin: getRTLRootMargin(ltrRootMargin.current, newInit?.root as Element, win),
      });
    },
    [ltrRootMargin, setObserverInit, win],
  );

  return { setObserverList, setObserverInit: setObserverInitExternal, observer };
};
