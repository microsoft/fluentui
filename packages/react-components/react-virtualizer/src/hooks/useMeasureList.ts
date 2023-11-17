import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

export interface IndexedResizeCallbackElement {
  handleResize: () => void;
}
/**
 * Provides a way of automating size in the virtualizer
 * Returns
 * `width` - element width ref (0 by default),
 * `height` - element height ref (0 by default),
 * `measureElementRef` - a ref function to be passed as `ref` to the element you want to measure
 */
export function useMeasureList<
  TElement extends HTMLElement & IndexedResizeCallbackElement = HTMLElement & IndexedResizeCallbackElement,
>(currentIndex: number, refLength: number, totalLength: number, defaultItemSize: number) {
  const widthArray = React.useRef(new Array(totalLength).fill(defaultItemSize));
  const heightArray = React.useRef(new Array(totalLength).fill(defaultItemSize));

  const refArray = React.useRef<Array<TElement | undefined | null>>([]);
  const { targetDocument } = useFluent();

  // the handler for resize observer
  const handleIndexUpdate = React.useCallback(
    (index: number) => {
      const boundClientRect = refArray.current[index]?.getBoundingClientRect();
      const containerWidth = boundClientRect?.width;
      widthArray.current[currentIndex + index] = containerWidth || defaultItemSize;

      const containerHeight = boundClientRect?.height;
      heightArray.current[currentIndex + index] = containerHeight || defaultItemSize;
    },
    [currentIndex, defaultItemSize],
  );

  const handleResize = (entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      const target = entry.target as TElement;
      // Call the elements own resize handler (indexed)
      target.handleResize();
    }
  };

  React.useEffect(() => {
    widthArray.current = new Array(totalLength).fill(defaultItemSize);
    heightArray.current = new Array(totalLength).fill(defaultItemSize);
  }, [defaultItemSize, totalLength]);

  // Keep the reference of ResizeObserver in the state, as it should live through renders
  const [resizeObserver] = React.useState(() => createResizeObserverFromDocument(targetDocument, handleResize));

  const createIndexedRef = React.useCallback(
    (index: number) => {
      const measureElementRef = (el: TElement) => {
        if (!targetDocument || !resizeObserver) {
          return;
        }

        if (el) {
          el.handleResize = () => {
            handleIndexUpdate(index);
          };
        }

        // cleanup previous container
        if (refArray.current[index] !== undefined && refArray.current[index] !== null) {
          resizeObserver.unobserve(refArray.current[index]!);
        }

        refArray.current[index] = undefined;
        if (el) {
          refArray.current[index] = el;
          if (el !== undefined) {
            resizeObserver.observe(el);
          }
          handleIndexUpdate(index);
        }
      };

      return measureElementRef;
    },
    [handleIndexUpdate, resizeObserver, targetDocument],
  );

  React.useEffect(() => {
    return () => resizeObserver?.disconnect();
  }, [resizeObserver]);

  return { widthArray, heightArray, createIndexedRef, refArray };
}

/**
 * FIXME - TS 3.8/3.9 don't have ResizeObserver types by default, move this to a shared utility once we bump the minbar
 * A utility method that creates a ResizeObserver from a target document
 * @param targetDocument - document to use to create the ResizeObserver
 * @param callback  - https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/ResizeObserver#callback
 * @returns a ResizeObserver instance or null if the global does not exist on the document
 */
export function createResizeObserverFromDocument(
  targetDocument: Document | null | undefined,
  callback: ResizeObserverCallback,
) {
  if (!targetDocument?.defaultView?.ResizeObserver) {
    return null;
  }

  return new targetDocument.defaultView.ResizeObserver(callback);
}
