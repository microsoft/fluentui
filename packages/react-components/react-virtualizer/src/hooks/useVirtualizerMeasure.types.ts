export type IVirtualizerMeasureProps = {
  defaultItemSize: number;
  direction?: 'vertical' | 'horizontal';
};

export type IVirtualizerMeasureDynamicProps = {
  defaultItemSize: number;
  currentIndex: number;
  numItems: number;
  getItemSize: (index: number) => number;
  direction?: 'vertical' | 'horizontal';
};
