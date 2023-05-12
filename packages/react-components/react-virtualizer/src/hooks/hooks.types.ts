import { MutableRefObject } from 'react';

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

/**
 * Additional direct Ref prevents reading old resize entry data
 * Backwards compatible with ResizeObserverCallback if preferred
 */
export interface ResizeCallbackWithRef {
  (entries: ResizeObserverEntry[], observer: ResizeObserver, scrollRef?: MutableRefObject<HTMLElement | null>): void;
}
