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
      console.log('Scroll ref!');

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
      let length = 1;

      console.log('indexRef:', indexRef.current);
      console.log('virtualizerContext.contextPosition:', virtualizerContext.contextPosition);
      console.log('array positions:', virtualizerContext.childProgressiveSizes);
      console.log('containerSizeRef.current:', containerSizeRef.current);

      console.log('indexSizer <= containerSizeRef.current:', indexSizer <= containerSizeRef.current);
      console.log(
        'length + virtualizerContext.contextPosition < numItems:',
        length + virtualizerContext.contextPosition < numItems,
      );

      const sizeToBeat = containerSizeRef.current + virtualizerBufferSize * 2;
      console.log('numItems:', numItems);
      while (indexSizer <= containerSizeRef.current && i + virtualizerContext.contextIndex < numItems) {
        console.log('index sizer 1:', indexSizer);
        const iItemSize = getItemSize(indexRef.current + i);
        if (
          !virtualizerContext.childProgressiveSizes?.current ||
          virtualizerContext.childProgressiveSizes?.current.length < numItems
        ) {
          console.log('QUICK EXIT');
          return virtualizerLength - virtualizerBufferSize * 2;
        }

        const currentScrollPos = virtualizerContext.contextPosition;
        const currentItemPos = virtualizerContext.childProgressiveSizes?.current[indexRef.current + i] - iItemSize;

        let variance = 0;
        console.log('CHECK INDEX:', indexRef.current + i);
        console.log('currentScrollPos:', currentScrollPos);
        console.log('item end pos:', currentItemPos + iItemSize);
        console.log('CURRENT ITEM POS:', currentItemPos);
        if (currentScrollPos > currentItemPos + iItemSize) {
          console.log('This item is FULLY hidden - 1: ', indexRef.current + i);
          // The item isn't in view, ignore for now.
          i++;
          continue;
        } else if (currentScrollPos > currentItemPos) {
          console.log('This item is PARTIALLY hidden: ', indexRef.current + i);
          // The item is partially out of view, ignore the out of bounds
          variance = currentItemPos + iItemSize - currentScrollPos;
          console.log('VARIANCE:', variance);
          indexSizer += variance;
        } else {
          indexSizer += iItemSize;
        }
        // Increment
        console.log('iItemSize:', iItemSize);
        console.log('variance:', variance);
        i++;
        length++;
      }

      console.log('Check: ', i + virtualizerContext.contextPosition < numItems);
      console.log('index sizer 2:', indexSizer);
      console.log('Got new length:', length);

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
    handleScrollResize(container);
  }, [virtualizerContext.contextIndex]);

  return {
    virtualizerLength,
    bufferItems: virtualizerBufferItems,
    bufferSize: virtualizerBufferSize,
    scrollRef,
    containerSizeRef,
  };
};
