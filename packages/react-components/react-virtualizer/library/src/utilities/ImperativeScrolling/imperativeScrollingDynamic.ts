import { ScrollToItemDynamicParams } from './imperativeScrolling.types';

export const scrollToItemDynamic = (params: ScrollToItemDynamicParams) => {
  const { index, itemSizes, totalSize, scrollViewRef, axis = 'vertical', reversed = false, behavior = 'auto' } = params;
  if (!itemSizes.current) {
    return;
  }

  if (itemSizes.current === null || itemSizes.current.length < index) {
    // null check - abort
    return;
  }

  let itemDepth = 0;
  for (let i = 0; i < index; i++) {
    if (i < index) {
      itemDepth += itemSizes.current[i];
    }
  }

  if (axis === 'horizontal') {
    if (reversed) {
      scrollViewRef.current?.scrollTo({
        left: totalSize - itemDepth,
        behavior,
      });
    } else {
      scrollViewRef.current?.scrollTo({
        left: itemDepth,
        behavior,
      });
    }
  } else {
    if (reversed) {
      scrollViewRef.current?.scrollTo({
        top: totalSize - itemDepth,
        behavior,
      });
    } else {
      scrollViewRef.current?.scrollTo({
        top: itemDepth,
        behavior,
      });
    }
  }
};
