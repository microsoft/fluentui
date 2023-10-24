import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * Provides a way of reporting element width.
 * Returns
 * `width` - current element width (0 by default),
 * `measureElementRef` - a ref function to be passed as `ref` to the element you want to measure
 */
export function useMeasureElement<TElement extends HTMLElement = HTMLElement>() {
  const [width, setWidth] = React.useState(0);
  const container = React.useRef<HTMLElement | undefined>(undefined);

  const { targetDocument } = useFluent();

  // the handler for resize observer
  const handleResize = React.useCallback(() => {
    const containerWidth = container.current?.getBoundingClientRect().width;
    setWidth(containerWidth || 0);
  }, []);

  // Keep the reference of ResizeObserver in the state, as it should live through renders
  const [resizeObserver] = React.useState(() => createResizeObserverFromDocument(targetDocument, handleResize));
  const measureElementRef = React.useCallback(
    (el: TElement | null) => {
      if (!targetDocument || !resizeObserver) {
        return;
      }

      // cleanup previous container
      if (container.current) {
        resizeObserver.unobserve(container.current);
      }

      container.current = undefined;
      if (el?.parentElement) {
        container.current = el.parentElement;
        resizeObserver.observe(container.current);
        handleResize();
      }
    },
    [targetDocument, resizeObserver, handleResize],
  );

  React.useEffect(() => {
    return () => resizeObserver?.disconnect();
  }, [resizeObserver]);

  return { width, measureElementRef };
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
