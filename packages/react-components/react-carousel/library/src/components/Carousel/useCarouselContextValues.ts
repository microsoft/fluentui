import * as React from 'react';

import type { CarouselContextValues } from '../CarouselContext.types';
import type { CarouselState } from './Carousel.types';

export function useCarouselContextValues_unstable(state: CarouselState): CarouselContextValues {
  const {
    activeIndex,
    selectPageByElement,
    selectPageByDirection,
    selectPageByIndex,
    subscribeForValues,
    enableAutoplay,
    resetAutoplay,
    circular,
    containerRef,
    viewportRef,
  } = state;

  const carousel = React.useMemo(
    () => ({
      activeIndex,
      selectPageByElement,
      selectPageByDirection,
      selectPageByIndex,
      subscribeForValues,
      enableAutoplay,
      resetAutoplay,
      circular,
      containerRef,
      viewportRef,
    }),
    [
      activeIndex,
      selectPageByElement,
      selectPageByDirection,
      selectPageByIndex,
      subscribeForValues,
      enableAutoplay,
      resetAutoplay,
      circular,
      containerRef,
      viewportRef,
    ],
  );

  return { carousel };
}
