import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';
import { VirtualizerMeasureDynamicProps } from './hooks.types';
import { useResizeObserverRef_unstable } from './useResizeObserverRef';
import { useRef } from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * React hook that measures virtualized space dynamically to ensure optimized virtualization length.
 */
export const useDynamicVirtualizerMeasure = <TElement extends HTMLElement>(
  virtualizerProps: VirtualizerMeasureDynamicProps,
): {
  virtualizerLength: number;
  bufferItems: number;
  bufferSize: number;
  scrollRef: (instance: TElement | null) => void;
  containerSizeRef: React.MutableRefObject<number>;
} => {
  const {
    defaultItemSize,
    direction = 'vertical',
    numItems,
    getItemSize,
    bufferItems,
    bufferSize,
    virtualizerContext,
  } = virtualizerProps;
  const indexRef = useRef<number>(virtualizerContext.contextIndex);
  indexRef.current = virtualizerContext.contextIndex;

  const [state, setState] = React.useState({
    virtualizerLength: 0,
    virtualizerBufferItems: 0,
    virtualizerBufferSize: 0,
  });

  const containerSizeRef = React.useRef<number>(0);
  const { virtualizerLength, virtualizerBufferItems, virtualizerBufferSize } = state;

  const { targetDocument } = useFluent();
  const container = React.useRef<HTMLElement | null>(null);
  const handleScrollResize = React.useCallback(
    (scrollRef: React.MutableRefObject<HTMLElement | null>) => {
      if (!scrollRef?.current) {
        // Error? ignore?
        return;
      }

      if (scrollRef.current !== targetDocument?.body) {
        // We have a local scroll container
        containerSizeRef.current =
          direction === 'vertical'
            ? scrollRef?.current.getBoundingClientRect().height
            : scrollRef?.current.getBoundingClientRect().width;
      } else if (targetDocument?.defaultView) {
        // If our scroll ref is the document body, we should check window height
        containerSizeRef.current =
          direction === 'vertical' ? targetDocument?.defaultView?.innerHeight : targetDocument?.defaultView?.innerWidth;
      }

      let indexSizer = 0;
      let i = 0;
      let length = 0;

      const sizeToBeat = containerSizeRef.current + virtualizerBufferSize * 2;
      while (indexSizer <= sizeToBeat && i + virtualizerContext.contextIndex < numItems) {
        const iItemSize = getItemSize(indexRef.current + i);
        if (
          !virtualizerContext.childProgressiveSizes?.current ||
          virtualizerContext.childProgressiveSizes?.current.length < numItems
        ) {
          return virtualizerLength - virtualizerBufferSize * 2;
        }

        const currentScrollPos = virtualizerContext.contextPosition;
        const currentItemPos = virtualizerContext.childProgressiveSizes?.current[indexRef.current + i] - iItemSize;

        let variance = 0;
        if (currentScrollPos > currentItemPos + iItemSize) {
          // The item isn't in view, ignore for now.
          i++;
          continue;
        } else if (currentScrollPos > currentItemPos) {
          // The item is partially out of view, ignore the out of bounds
          variance = currentItemPos + iItemSize - currentScrollPos;
          indexSizer += variance;
        } else {
          indexSizer += iItemSize;
        }
        // Increment
        i++;
        length++;
      }

      /*
       * Number of items to append at each end, i.e. 'preload' each side before entering view.
       * Minimum: 2 - we give slightly more buffer for dynamic version.
       */
      const newBufferItems = bufferItems ?? Math.max(Math.ceil(length / 3), 1);

      /*
       * This is how far we deviate into the bufferItems to detect a redraw.
       */
      const newBufferSize = bufferSize ?? Math.max(defaultItemSize / 2.0, 1);
      const totalLength = length + newBufferItems * 2;
      setState({
        virtualizerLength: totalLength,
        virtualizerBufferSize: newBufferSize,
        virtualizerBufferItems: newBufferItems,
      });
    },
    [
      bufferItems,
      bufferSize,
      defaultItemSize,
      direction,
      getItemSize,
      numItems,
      targetDocument?.body,
      targetDocument?.defaultView,
      virtualizerBufferSize,
      virtualizerContext.childProgressiveSizes,
      virtualizerContext.contextIndex,
      virtualizerContext.contextPosition,
      virtualizerLength,
    ],
  );

  const resizeCallback = React.useCallback(
    (
      _entries: ResizeObserverEntry[],
      // TODO: exclude types from this lint rule: https://github.com/microsoft/fluentui/issues/31286
      // eslint-disable-next-line no-restricted-globals
      _observer: ResizeObserver,
      scrollRef?: React.MutableRefObject<HTMLElement | null>,
    ) => {
      if (scrollRef) {
        handleScrollResize(scrollRef);
      }
    },
    [handleScrollResize],
  );

  const scrollRef = useMergedRefs(container, useResizeObserverRef_unstable(resizeCallback));

  useIsomorphicLayoutEffect(() => {
    if (virtualizerContext.contextIndex + virtualizerLength < numItems) {
      // Avoid re-rendering/re-calculating when the end index has already been reached
      handleScrollResize(container);
    }
  }, [handleScrollResize, numItems, virtualizerContext.contextIndex, virtualizerLength]);

  return {
    virtualizerLength,
    bufferItems: virtualizerBufferItems,
    bufferSize: virtualizerBufferSize,
    scrollRef,
    containerSizeRef,
  };
};
