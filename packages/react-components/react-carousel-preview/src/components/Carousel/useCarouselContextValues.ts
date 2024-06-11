import * as React from 'react';

import type { CarouselContextValues } from '../CarouselContext.types';
import type { CarouselState } from './Carousel.types';

export function useCarouselContextValues_unstable(state: CarouselState): CarouselContextValues {
  const { store, selectPageByDirection, selectPageByValue, circular, peeking } = state;

  const carousel = React.useMemo(
    () => ({
      store,
      selectPageByDirection,
      selectPageByValue,
      circular,
      peeking,
    }),
    [store, selectPageByDirection, selectPageByValue, circular, peeking],
  );

  return { carousel };
}
