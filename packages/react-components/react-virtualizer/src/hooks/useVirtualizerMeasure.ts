import * as React from 'react';
import { canUseDOM } from '@fluentui/react-utilities';
import { IVirtualizerMeasureDynamicProps, IVirtualizerMeasureProps } from './useVirtualizerMeasure.types';
import { debounce } from '../utilities/debounce';
import * as ReactDOM from 'react-dom';

/**
 * React hook that measures virtualized space based on a static size to ensure optimized virtualization length.
 */
export const useStaticVirtualizerMeasure = (
  virtualizerProps: IVirtualizerMeasureProps,
): {
  virtualizerLength: number;
  bufferItems: number;
  bufferSize: number;
  scrollRef: (instance: HTMLElement | HTMLDivElement | null) => void;
} => {
  const { defaultItemSize, direction = 'vertical' } = virtualizerProps;

  const [virtualizerLength, setVirtualizerLength] = React.useState(0);
  const [virtualizerBufferItems, setVirtualizerBufferItems] = React.useState(0);
  const [virtualizerBufferSize, setVirtualizerBufferSize] = React.useState(0);

  // The ref the user sets on their scrollView - Defaults to document.body to ensure no null on init
  const container: React.MutableRefObject<HTMLElement | null> = React.useRef<HTMLElement | null>(null);

  // the handler for resize observer
  const handleResize = debounce(
    React.useCallback(() => {
      if (!container.current) {
        return;
      }

      const containerSize =
        direction === 'vertical'
          ? container.current.getBoundingClientRect().height
          : container.current.getBoundingClientRect().width;

      /*
       * Number of items required to cover viewport.
       */
      const length = Math.ceil(containerSize / defaultItemSize + 1);

      /*
       * Number of items to append at each end, i.e. 'preload' each side before entering view.
       */
      const bufferItems = Math.max(Math.floor(length / 4), 2);

      /*
       * This is how far we deviate into the bufferItems to detect a redraw.
       */
      const bufferSize = Math.max(Math.floor((length / 8) * defaultItemSize), 1);

      const totalLength = length + bufferItems * 2 + 1;

      ReactDOM.unstable_batchedUpdates(() => {
        setVirtualizerLength(totalLength);
        setVirtualizerBufferSize(bufferSize);
        setVirtualizerBufferItems(bufferItems);
      });
    }, [defaultItemSize, direction]),
  );

  // Keep the reference of ResizeObserver in the state, as it should live through renders
  const [resizeObserver] = React.useState(canUseDOM() ? new ResizeObserver(handleResize) : undefined);

  const scrollRef = React.useCallback(
    (el: HTMLElement | null) => {
      if (container.current !== el) {
        if (container.current) {
          resizeObserver?.unobserve(container.current);
        }

        container.current = el;
        if (container.current) {
          resizeObserver?.observe(container.current);
        }
      }
    },
    [resizeObserver],
  );

  return {
    virtualizerLength,
    bufferItems: virtualizerBufferItems,
    bufferSize: virtualizerBufferSize,
    scrollRef,
  };
};

/**
 * React hook that measures virtualized space dynamically to ensure optimized virtualization length.
 */

export const useDynamicVirtualizerMeasure = (
  virtualizerProps: IVirtualizerMeasureDynamicProps,
): {
  virtualizerLength: number;
  virtualizerBufferItems: number;
  virtualizerBufferSize: number;
} => {
  // TODO Add resize observer and update sizes as resize observer callback occurs - dispatch?
  return { virtualizerLength: 10, virtualizerBufferItems: 10, virtualizerBufferSize: 10 };
};
