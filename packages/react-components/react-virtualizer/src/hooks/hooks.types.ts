import { MutableRefObject, RefObject } from 'react';

export type VirtualizerMeasureProps = {
  defaultItemSize: number;
  direction?: 'vertical' | 'horizontal';
};

export type VirtualizerMeasureDynamicProps = {
  defaultItemSize: number;
  currentIndex: number;
  numItems: number;
  getItemSize: (index: number) => number;
  direction?: 'vertical' | 'horizontal';
};

export type VirtualizerStaticPaginationProps = {
  itemSize: number;
  axis?: 'vertical' | 'horizontal';
};

/**
 * Props to be passed into dynamic virtualization hooks
 * All props can be acquired from useVirtualizer hooks themselves and passed in
 */
export type VirtualizerDynamicPaginationProps = {
  /**
   * An array that tracks the sizing of each item in virtualizer cumulatively
   */
  progressiveItemSizes: RefObject<number[]> | undefined;
  /**
   * The current starting index of the virtualizer's DOM elements
   */
  currentIndex: number;
  /**
   * The axis we should paginate on (should match virtualizer's axis)
   */
  axis?: 'vertical' | 'horizontal';
  /**
   * The current length of Virtualizer's actual DOM elements
   */
  virtualizerLength: number;
};

/**
 * Additional direct Ref prevents reading old resize entry data
 * Backwards compatible with ResizeObserverCallback if preferred
 */
export interface ResizeCallbackWithRef {
  (
    entries: ResizeObserverEntry[],
    // TODO: exclude types from this lint rule: https://github.com/microsoft/fluentui/issues/31286
    // eslint-disable-next-line no-restricted-globals
    observer: ResizeObserver,
    scrollRef?: MutableRefObject<HTMLElement | null>,
  ): void;
}
