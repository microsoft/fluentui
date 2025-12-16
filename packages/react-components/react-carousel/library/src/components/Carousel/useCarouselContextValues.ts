'use client';

import * as React from 'react';

import type { CarouselContextValues } from '../CarouselContext.types';
import type { CarouselState } from './Carousel.types';

export function useCarouselContextValues_unstable(state: CarouselState): CarouselContextValues {
  const {
    activeIndex,
    appearance,
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
      appearance,
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
      appearance,
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
