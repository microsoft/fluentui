import type { RefObject } from 'react';

export type ScrollToItemStaticParams = {
  index: number;
  itemSize: number;
  totalItems: number;
  scrollViewRef: RefObject<HTMLDivElement>;
  axis?: 'horizontal' | 'vertical';
  reversed?: boolean;
  behavior?: ScrollBehavior;
};

export type ScrollToItemDynamicParams = {
  index: number;
  itemSizes: RefObject<number[]>;
  totalSize: number;
  scrollViewRef: RefObject<HTMLDivElement>;
  axis?: 'horizontal' | 'vertical';
  reversed?: boolean;
  behavior?: ScrollBehavior;
};

export type ScrollToInterface = {
  scrollTo: (index: number, behavior?: ScrollBehavior, callback?: (index: number) => void) => void;
  virtualizerLength: RefObject<number>;
  currentIndex: RefObject<number> | undefined;
};
