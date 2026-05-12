'use client';

import * as React from 'react';
import type {
  TeachingPopoverCarouselContextValues,
  TeachingPopoverCarouselState,
} from './TeachingPopoverCarousel.types';

export function useTeachingPopoverCarouselContextValues_unstable(
  state: TeachingPopoverCarouselState,
): TeachingPopoverCarouselContextValues {
  const { store, value, selectPageByValue, selectPageByDirection } = state;

  const carousel = React.useMemo(
    () => ({
      store,
      value,
      selectPageByDirection,
      selectPageByValue,
    }),
    [store, value, selectPageByDirection, selectPageByValue],
  );

  return { carousel };
}
