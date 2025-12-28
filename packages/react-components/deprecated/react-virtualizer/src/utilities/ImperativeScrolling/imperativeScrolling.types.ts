import * as React from 'react';

export type ScrollToItemStaticParams = {
  index: number;
  itemSize: number;
  totalItems: number;
  scrollViewRef: React.RefObject<HTMLDivElement>;
  axis?: 'horizontal' | 'vertical';
  reversed?: boolean;
  behavior?: ScrollBehavior;
};

export type ScrollToItemDynamicParams = {
  index: number;
  itemSizes: React.RefObject<number[]>;
  totalSize: number;
  scrollViewRef: React.RefObject<HTMLDivElement>;
  axis?: 'horizontal' | 'vertical';
  reversed?: boolean;
  behavior?: ScrollBehavior;
};

export type ScrollToInterface = {
  scrollTo: (index: number, behavior?: ScrollBehavior, callback?: (index: number) => void) => void;
  virtualizerLength: React.RefObject<number>;
  currentIndex: React.RefObject<number> | undefined;
};
