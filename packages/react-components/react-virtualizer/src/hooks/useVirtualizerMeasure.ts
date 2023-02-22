import * as React from 'react';
import { canUseDOM } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * React hook that measures virtualized space based on a static size to ensure optimized virtualization length.
 */
export const useStaticVirtualizerMeasure = (
  defaultItemSize: number,
  scrollView: HTMLElement | null,
  direction: 'vertical' | 'horizontal',
): {
  virtualizerLength: number;
  bufferItems: number;
  bufferSize: number;
} => {
  const [virtualizerLength, setVirtualizerLength] = React.useState(0);
  const [virtualizerBufferItems, setVirtualizerBufferItems] = React.useState(0);
  const [virtualizerBufferSize, setVirtualizerBufferSize] = React.useState(0);

  const { targetDocument } = useFluent();

  // We should always return something valid, document.body provides safe initialization until defined.
  const _scrollView = scrollView ?? targetDocument?.body ?? null;
  const container = React.useRef<HTMLElement | null>(null);

  // the handler for resize observer
  const handleResize = React.useCallback(() => {
    console.log('HANDLING RESIZE!');
    const containerSize =
      direction === 'vertical'
        ? container.current?.getBoundingClientRect().height
        : container.current?.getBoundingClientRect().width;

    if (!containerSize) {
      // Error? ignore?
      return;
    }

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

    const totalLength = length + bufferItems * 2;

    setVirtualizerLength(totalLength);
    setVirtualizerBufferSize(bufferSize);
    setVirtualizerBufferItems(bufferItems);

    console.log('New RESIZE Length:', totalLength);
  }, [defaultItemSize, direction, scrollView]);

  // Keep the reference of ResizeObserver in the state, as it should live through renders
  const [resizeObserver] = React.useState(canUseDOM() ? new ResizeObserver(handleResize) : undefined);

  if (_scrollView !== container.current) {
    if (container.current) {
      resizeObserver?.unobserve(container.current);
    }
    // Update
    container.current = _scrollView;

    // Only observe if not null
    if (container.current) {
      resizeObserver?.observe(container.current);
    }

    handleResize();
  }

  if (!_scrollView) {
    console.log('NO SCROLL VIEW FOUND');
    return { virtualizerLength: 3, bufferItems: 1, bufferSize: 1 };
  }
  // Do we want to use a dispatch here?
  return { virtualizerLength, bufferItems: virtualizerBufferItems, bufferSize: virtualizerBufferSize };
};

/**
 * React hook that measures virtualized space dynamically to ensure optimized virtualization length.
 */

export const useDynamicVirtualizerMeasure = (
  defaultItemSize: number,
  currentIndex: number,
  getItemSize: (index: number) => number,
  scrollView?: React.ReactNode,
): {
  virtualizerLength: number;
  virtualizerBufferItems: number;
  virtualizerBufferSize: number;
} => {
  // TODO Add resize observer and update sizes as resize observer callback occurs - dispatch?
  return { virtualizerLength: 10, virtualizerBufferItems: 10, virtualizerBufferSize: 10 };
};
