import * as React from 'react';

import type { CarouselContextValues } from '../CarouselContext.types';
import type { CarouselState } from './Carousel.types';

export function useCarouselContextValues_unstable(state: CarouselState): CarouselContextValues {
  const { store, selectPageByDirection, selectPageByValue, circular, groupSize } = state;

  const carousel = React.useMemo(
    () => ({
      store,
      selectPageByDirection,
      selectPageByValue,
      circular,
      groupSize,
    }),
    [store, selectPageByDirection, selectPageByValue, circular, groupSize],
  );

  return { carousel };
}
