import * as React from 'react';

import type { CarouselContextValues } from '../CarouselContext.types';
import type { CarouselState } from './Carousel.types';

export function useCarouselContextValues_unstable(state: CarouselState): CarouselContextValues {
  const { activeIndex, selectPageByFocus, selectPageByDirection, selectPageByIndex, subscribeForValues, circular } =
    state;

  const carousel = React.useMemo(
    () => ({
      activeIndex,
      selectPageByFocus,
      selectPageByDirection,
      selectPageByIndex,
      subscribeForValues,
      circular,
    }),
    [activeIndex, selectPageByFocus, selectPageByDirection, selectPageByIndex, subscribeForValues, circular],
  );

  return { carousel };
}
