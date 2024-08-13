import * as React from 'react';
import { VirtualizerMeasureProps } from './hooks.types';
import { useResizeObserverRef_unstable } from './useResizeObserverRef';

/**
 * React hook that measures virtualized space based on a static size to ensure optimized virtualization length.
 */
export const useStaticVirtualizerMeasure = <TElement extends HTMLElement>(
  virtualizerProps: VirtualizerMeasureProps,
): {
  virtualizerLength: number;
  bufferItems: number;
  bufferSize: number;
  scrollRef: (instance: TElement | null) => void;
} => {
  const { defaultItemSize, direction = 'vertical' } = virtualizerProps;

  const [state, setState] = React.useState({
    virtualizerLength: 0,
    bufferSize: 0,
    bufferItems: 0,
  });

  const { virtualizerLength, bufferItems, bufferSize } = state;

  const resizeCallback = React.useCallback(
    (
      _entries: ResizeObserverEntry[],
      // TODO: exclude types from this lint rule: https://github.com/microsoft/fluentui/issues/31286
      // eslint-disable-next-line no-restricted-globals
      _observer: ResizeObserver,
      scrollRef?: React.MutableRefObject<HTMLElement | null>,
    ) => {
      if (!scrollRef?.current) {
        return;
      }

      const containerSize =
        direction === 'vertical'
          ? scrollRef?.current.getBoundingClientRect().height
          : scrollRef?.current.getBoundingClientRect().width;

      /*
       * Number of items required to cover viewport.
       */
      const length = Math.ceil(containerSize / defaultItemSize + 1);

      /*
       * Number of items to append at each end, i.e. 'preload' each side before entering view.
       */
      const newBufferItems = Math.max(Math.floor(length / 4), 2);

      /*
       * This is how far we deviate into the bufferItems to detect a redraw.
       */
      const newBufferSize = Math.max(Math.floor((length / 8) * defaultItemSize), 1);

      const totalLength = length + newBufferItems * 2 + 1;

      setState({
        virtualizerLength: totalLength,
        bufferItems: newBufferItems,
        bufferSize: newBufferSize,
      });
    },
    [defaultItemSize, direction],
  );

  const scrollRef = useResizeObserverRef_unstable(resizeCallback);

  return {
    virtualizerLength,
    bufferItems,
    bufferSize,
    scrollRef,
  };
};
