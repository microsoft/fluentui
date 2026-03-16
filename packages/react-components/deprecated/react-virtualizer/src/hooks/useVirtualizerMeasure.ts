'use client';

import * as React from 'react';
import { VirtualizerMeasureProps } from './hooks.types';
import { useResizeObserverRef_unstable } from './useResizeObserverRef';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * React hook that measures virtualized space based on a static size to ensure optimized virtualization length.
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const useStaticVirtualizerMeasure = <TElement extends HTMLElement>(
  virtualizerProps: VirtualizerMeasureProps,
): {
  virtualizerLength: number;
  bufferItems: number;
  bufferSize: number;
  scrollRef: (instance: TElement | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  containerSizeRef: React.MutableRefObject<number>;
} => {
  const { defaultItemSize, direction = 'vertical', bufferItems, bufferSize } = virtualizerProps;

  const [state, setState] = React.useState({
    virtualizerLength: 0,
    _bufferSize: 0,
    _bufferItems: 0,
  });

  const containerSizeRef = React.useRef<number>(0);
  const { targetDocument } = useFluent();

  const { virtualizerLength, _bufferItems, _bufferSize } = state;

  const resizeCallback = React.useCallback(
    (
      _entries: ResizeObserverEntry[],
      // TODO: exclude types from this lint rule: https://github.com/microsoft/fluentui/issues/31286

      _observer: ResizeObserver,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      scrollRef?: React.MutableRefObject<HTMLElement | null>,
    ) => {
      if (!scrollRef?.current) {
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
      /*
       * Number of items required to cover viewport.
       */
      const length = Math.ceil(containerSizeRef.current / defaultItemSize + 1);

      /*
       * Number of items to append at each end, i.e. 'preload' each side before entering view.
       * Minimum: 1
       */
      const newBufferItems = bufferItems ?? Math.max(Math.ceil(length / 4), 1);

      /*
       * This is how far we deviate into the bufferItems to detect a redraw.
       */
      const newBufferSize = bufferSize ?? Math.max(defaultItemSize / 2.0, 1);

      const totalLength = length + newBufferItems * 2;

      setState({
        virtualizerLength: totalLength,
        _bufferItems: newBufferItems,
        _bufferSize: newBufferSize,
      });
    },
    [bufferItems, bufferSize, defaultItemSize, direction, targetDocument?.body, targetDocument?.defaultView],
  );

  const scrollRef = useResizeObserverRef_unstable(resizeCallback);

  return {
    virtualizerLength,
    bufferItems: _bufferItems,
    bufferSize: _bufferSize,
    scrollRef,
    containerSizeRef,
  };
};
