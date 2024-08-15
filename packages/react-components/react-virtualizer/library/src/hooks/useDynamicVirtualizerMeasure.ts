import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';
import { VirtualizerMeasureDynamicProps } from './hooks.types';
import { useResizeObserverRef_unstable } from './useResizeObserverRef';
import { useRef } from 'react';

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
} => {
  const { defaultItemSize, direction = 'vertical', numItems, getItemSize, currentIndex } = virtualizerProps;
  const indexRef = useRef<number>(currentIndex);
  indexRef.current = currentIndex;

  const [state, setState] = React.useState({
    virtualizerLength: 0,
    virtualizerBufferItems: 0,
    virtualizerBufferSize: 0,
  });

  const { virtualizerLength, virtualizerBufferItems, virtualizerBufferSize } = state;

  const container = React.useRef<HTMLElement | null>(null);
  const handleScrollResize = React.useCallback(
    (scrollRef: React.MutableRefObject<HTMLElement | null>) => {
      if (!scrollRef?.current) {
        // Error? ignore?
        return;
      }

      if (scrollRef.current !== container.current) {
        container.current = scrollRef.current;
      }

      const containerSize =
        direction === 'vertical'
          ? scrollRef.current.getBoundingClientRect().height
          : scrollRef.current.getBoundingClientRect().width;

      let indexSizer = 0;
      let length = 0;

      while (indexSizer <= containerSize && length < numItems) {
        const iItemSize = getItemSize(indexRef.current + length);

        // Increment
        indexSizer += iItemSize;
        length++;
      }

      /*
       * Number of items to append at each end, i.e. 'preload' each side before entering view.
       */
      const bufferItems = Math.max(Math.floor(length / 4), 4);

      /*
       * This is how far we deviate into the bufferItems to detect a redraw.
       */
      const bufferSize = Math.max(Math.floor((length / 8) * defaultItemSize), 1);

      const totalLength = length + bufferItems * 2 + 1;
      setState({
        virtualizerLength: totalLength,
        virtualizerBufferSize: bufferSize,
        virtualizerBufferItems: bufferItems,
      });
    },
    [defaultItemSize, direction, getItemSize, numItems],
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
    if (!container.current) {
      return;
    }

    const containerSize =
      direction === 'vertical'
        ? container.current?.getBoundingClientRect().height * 1.5
        : container.current?.getBoundingClientRect().width * 1.5;

    let couldBeSmaller = false;
    let recheckTotal = 0;
    for (let i = currentIndex; i < currentIndex + virtualizerLength; i++) {
      const newItemSize = getItemSize(i);
      recheckTotal += newItemSize;

      const newLength = i - currentIndex;

      const bufferItems = Math.max(Math.floor(newLength / 4), 2);
      const totalNewLength = newLength + bufferItems * 2 + 4;
      const compareLengths = totalNewLength < virtualizerLength;

      if (recheckTotal > containerSize && compareLengths) {
        couldBeSmaller = true;
        break;
      }
    }

    // Check if the render has caused us to need a re-calc of virtualizer length
    if (recheckTotal < containerSize || couldBeSmaller) {
      handleScrollResize(container);
    }
  }, [getItemSize, currentIndex, direction, virtualizerLength, resizeCallback, handleScrollResize]);

  return {
    virtualizerLength,
    bufferItems: virtualizerBufferItems,
    bufferSize: virtualizerBufferSize,
    scrollRef,
  };
};
