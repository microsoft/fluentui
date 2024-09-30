import { MutableRefObject, RefObject } from 'react';
import { DynamicVirtualizerContextProps } from '../Utilities';

export type VirtualizerMeasureProps = {
  defaultItemSize: number;
  direction?: 'vertical' | 'horizontal';

  /**
   * Override recommended number of buffer items
   */
  bufferItems?: number;

  /**
   * Override recommended buffer size (px)
   */
  bufferSize?: number;
};

export type VirtualizerMeasureDynamicProps = {
  defaultItemSize: number;
  virtualizerContext: DynamicVirtualizerContextProps;
  numItems: number;
  getItemSize: (index: number) => number;
  direction?: 'vertical' | 'horizontal';

  /**
   * Override recommended number of buffer items
   */
  bufferItems?: number;

  /**
   * Override recommended buffer size (px)
   */
  bufferSize?: number;
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
