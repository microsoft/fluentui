import * as React from 'react';
import { useRef } from 'react';
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

  // This lets us trigger updates when a size change occurs.
  const sizeUpdateCount = useRef(0);

  // the handler for resize observer
  const handleIndexUpdate = React.useCallback(
    (index: number) => {
      let isChanged = false;
      const boundClientRect = refArray.current[index]?.getBoundingClientRect();
      const containerWidth = boundClientRect?.width;
      if (containerWidth !== widthArray.current[currentIndex + index]) {
        isChanged = true;
      }
      widthArray.current[currentIndex + index] = containerWidth || defaultItemSize;

      const containerHeight = boundClientRect?.height;

      if (containerHeight !== heightArray.current[currentIndex + index]) {
        isChanged = true;
      }
      heightArray.current[currentIndex + index] = containerHeight || defaultItemSize;

      if (isChanged) {
        sizeUpdateCount.current = sizeUpdateCount.current + 1;
      }
    },
    [currentIndex, defaultItemSize, sizeUpdateCount],
  );

  const handleElementResizeCallback = (entries: ResizeObserverEntry[]) => {
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

  // Keep the reference of ResizeObserver as a ref, as it should live through renders
  const resizeObserver = React.useRef(createResizeObserverFromDocument(targetDocument, handleElementResizeCallback));

  /* createIndexedRef provides a dynamic function to create an undefined number of refs at render time
   * these refs then provide an indexed callback via attaching 'handleResize' to the element itself
   * this function is then called on resize by handleElementResize and relies on indexing
   * to track continuous sizes throughout renders while releasing all virtualized element refs each render cycle.
   */
  const createIndexedRef = React.useCallback(
    (index: number) => {
      const measureElementRef = (el: TElement) => {
        if (!targetDocument || !resizeObserver.current) {
          return;
        }

        if (el) {
          el.handleResize = () => {
            handleIndexUpdate(index);
          };
        }

        // cleanup previous container
        if (refArray.current[index] !== undefined && refArray.current[index] !== null) {
          resizeObserver.current.unobserve(refArray.current[index]!);
        }

        refArray.current[index] = undefined;
        if (el) {
          refArray.current[index] = el;
          resizeObserver.current.observe(el);
          handleIndexUpdate(index);
        }
      };

      return measureElementRef;
    },
    [handleIndexUpdate, resizeObserver, targetDocument],
  );

  React.useEffect(() => {
    const _resizeObserver = resizeObserver;
    return () => _resizeObserver.current?.disconnect();
  }, [resizeObserver]);

  return { widthArray, heightArray, createIndexedRef, refArray, sizeUpdateCount: sizeUpdateCount.current };
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
