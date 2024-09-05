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
    circular,
  } = state;

  const carousel = React.useMemo(
    () => ({
      activeIndex,
      selectPageByElement,
      selectPageByDirection,
      selectPageByIndex,
      subscribeForValues,
      enableAutoplay,
      circular,
    }),
    [
      activeIndex,
      selectPageByElement,
      selectPageByDirection,
      selectPageByIndex,
      subscribeForValues,
      enableAutoplay,
      circular,
    ],
  );

  return { carousel };
}
