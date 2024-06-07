import * as React from 'react';

import type { CarouselContextValues } from '../CarouselContext.types';
import type { CarouselState } from './Carousel.types';

export function useCarouselContextValues_unstable(state: CarouselState): CarouselContextValues {
  const { store, selectPageByDirection, selectPageByValue, circular, peeking, animated } = state;

  const carousel = React.useMemo(
    () => ({
      store,
      selectPageByDirection,
      selectPageByValue,
      circular,
      peeking,
      animated,
    }),
    [store, selectPageByDirection, selectPageByValue, circular, peeking, animated],
  );

  return { carousel };
}
