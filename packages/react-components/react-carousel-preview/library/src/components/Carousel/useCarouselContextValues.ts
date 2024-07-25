import * as React from 'react';

import type { CarouselContextValues } from '../CarouselContext.types';
import type { CarouselState } from './Carousel.types';

export function useCarouselContextValues_unstable(state: CarouselState): CarouselContextValues {
  const { store, selectPageByDirection, selectPageByIndex, subscribeForValues, circular } = state;

  const carousel = React.useMemo(
    () => ({
      store,
      selectPageByDirection,
      selectPageByIndex,
      subscribeForValues,
      circular,
    }),
    [store, selectPageByDirection, selectPageByIndex, subscribeForValues, circular],
  );

  return { carousel };
}
