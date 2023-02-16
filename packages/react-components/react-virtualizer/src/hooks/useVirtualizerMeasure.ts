import * as React from 'react';
/**
 * React hook that measures virtualized space based on a static size to ensure optimized virtualization length.
 */

export const useStaticVirtualizerMeasure = (
  defaultItemSize: number,
  scrollView: HTMLElement | null,
): {
  virtualizerLength: number;
  virtualizerBufferItems: number;
  virtualizerBufferSize: number;
} => {
  const [virtualizerLength, setVirtualizerLength] = React.useState(0);
  const [virtualizerBufferItems, setVirtualizerBufferItems] = React.useState(0);
  const [virtualizerBufferSize, setVirtualizerBufferSize] = React.useState(0);

  // We should always return something valid, document.body provides safe initialization until defined.
  const _scrollView = scrollView ?? document.body;

  const container = React.useRef<HTMLElement | null>(null);

  // the handler for resize observer
  const handleResize = React.useCallback(() => {
    const containerHeight = container.current?.getBoundingClientRect().height;

    if (!containerHeight) {
      // Error? ignore?
      return;
    }

    const length = Math.ceil((containerHeight / defaultItemSize) * 1.5);

    const bufferItems = Math.max(Math.floor(length / 8), 2);

    // Buffer has to be at least 1px in size
    const bufferSize = Math.max(Math.floor((length / 16) * defaultItemSize), 1);

    setVirtualizerLength(length);
    setVirtualizerBufferSize(bufferSize);
    setVirtualizerBufferItems(bufferItems);
  }, [defaultItemSize]);

  // Keep the reference of ResizeObserver in the state, as it should live through renders
  const [resizeObserver] = React.useState(new ResizeObserver(handleResize));

  if (_scrollView !== container.current) {
    if (container.current) {
      resizeObserver.unobserve(container.current);
    }
    // Update
    container.current = _scrollView;

    // Only observe if not null
    if (container.current) {
      resizeObserver.observe(container.current);
      handleResize();
    }
  }

  // Do we want to use a dispatch here?
  return { virtualizerLength, virtualizerBufferItems, virtualizerBufferSize };
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
