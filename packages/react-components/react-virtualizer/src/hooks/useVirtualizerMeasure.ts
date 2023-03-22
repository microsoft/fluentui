import * as React from 'react';
import { canUseDOM } from '@fluentui/react-utilities';
import { VirtualizerMeasureProps } from './useVirtualizerMeasure.types';
import { debounce } from '../utilities/debounce';

/**
 * React hook that measures virtualized space based on a static size to ensure optimized virtualization length.
 */
export const useStaticVirtualizerMeasure = (
  virtualizerProps: VirtualizerMeasureProps,
): {
  virtualizerLength: number;
  bufferItems: number;
  bufferSize: number;
  scrollRef: (instance: HTMLElement | HTMLDivElement | null) => void;
} => {
  const { defaultItemSize, direction = 'vertical' } = virtualizerProps;

  const [state, setState] = React.useState({
    virtualizerLength: 0,
    bufferSize: 0,
    bufferItems: 0,
  });

  const { virtualizerLength, bufferItems, bufferSize } = state;

  // The ref the user sets on their scrollView - Defaults to document.body to ensure no null on init
  const container = React.useRef<HTMLElement | null>(null);

  const resizeCallback = () => {
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
  };

  // the handler for resize observer
  const handleResize = debounce(resizeCallback);

  // Keep the reference of ResizeObserver in the state, as it should live through renders
  const [resizeObserver] = React.useState(canUseDOM() ? new ResizeObserver(handleResize) : undefined);

  React.useEffect(() => {
    return () => {
      resizeObserver?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    bufferItems,
    bufferSize,
    scrollRef,
  };
};
