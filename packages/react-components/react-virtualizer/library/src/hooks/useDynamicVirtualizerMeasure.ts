import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
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
    currentIndex,
    bufferItems,
    bufferSize,
  } = virtualizerProps;
  const indexRef = useRef<number>(currentIndex);
  indexRef.current = currentIndex;

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
        const containerSize =
          direction === 'vertical'
            ? scrollRef?.current.getBoundingClientRect().height
            : scrollRef?.current.getBoundingClientRect().width;

        containerSizeRef.current = containerSize;
      } else if (targetDocument?.defaultView) {
        // If our scroll ref is the document body, we should check window height
        containerSizeRef.current =
          direction === 'vertical' ? targetDocument?.defaultView?.innerHeight : targetDocument?.defaultView?.innerWidth;
      }

      let indexSizer = 0;
      let length = 0;

      while (indexSizer <= containerSizeRef.current && length < numItems) {
        const iItemSize = getItemSize(indexRef.current + length);

        // Increment
        indexSizer += iItemSize;
        length++;
      }

      /*
       * Number of items to append at each end, i.e. 'preload' each side before entering view.
       */
      const newBufferItems = bufferItems ?? Math.max(Math.ceil(length / 3), 2);

      /*
       * This is how far we deviate into the bufferItems to detect a redraw.
       */
      const newBufferSize = bufferSize ?? Math.min(defaultItemSize / 2.0, 100);
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

  const scrollRef = useResizeObserverRef_unstable(resizeCallback);

  useIsomorphicLayoutEffect(() => {
    let couldBeSmaller = false;
    let recheckTotal = 0;
    for (let i = currentIndex; i < currentIndex + virtualizerLength; i++) {
      const newItemSize = getItemSize(i);
      recheckTotal += newItemSize;

      const newLength = i - currentIndex;

      const totalNewLength = newLength + virtualizerBufferItems * 2;
      const compareLengths = totalNewLength < virtualizerLength;

      if (recheckTotal > containerSizeRef.current && compareLengths) {
        couldBeSmaller = true;
        break;
      }
    }

    // Check if the render has caused us to need a re-calc of virtualizer length
    if (recheckTotal < containerSizeRef.current || couldBeSmaller) {
      handleScrollResize(container);
    }
  }, [
    getItemSize,
    currentIndex,
    direction,
    virtualizerLength,
    resizeCallback,
    handleScrollResize,
    virtualizerBufferItems,
  ]);

  return {
    virtualizerLength,
    bufferItems: virtualizerBufferItems,
    bufferSize: virtualizerBufferSize,
    scrollRef,
    containerSizeRef,
  };
};
