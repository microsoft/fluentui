import { ScrollToItemStaticParams } from './imperativeScrolling.types';

export const scrollToItemStatic = (params: ScrollToItemStaticParams) => {
  const { index, itemSize, totalItems, scrollViewRef, axis = 'vertical', reversed = false, behavior = 'auto' } = params;

  if (axis === 'horizontal') {
    if (reversed) {
      scrollViewRef.current?.scrollTo({
        left: totalItems * itemSize - itemSize * index,
        behavior,
      });
    } else {
      scrollViewRef.current?.scrollTo({
        left: itemSize * index,
        behavior,
      });
    }
  } else {
    if (reversed) {
      scrollViewRef.current?.scrollTo({
        top: totalItems * itemSize - itemSize * index,
        behavior,
      });
    } else {
      scrollViewRef.current?.scrollTo({
        top: itemSize * index,
        behavior,
      });
    }
  }
};
