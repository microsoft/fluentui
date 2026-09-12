'use client';

import * as React from 'react';
import type {
  TeachingPopoverCarouselContextValues,
  TeachingPopoverCarouselState,
} from './TeachingPopoverCarousel.types';

export function useTeachingPopoverCarouselContextValues_unstable(
  state: TeachingPopoverCarouselState,
): TeachingPopoverCarouselContextValues {
  const { store, value, selectPageByValue, selectPageByDirection, footerButtonRefs } = state;

  const carousel = React.useMemo(
    () => ({
      store,
      value,
      selectPageByDirection,
      selectPageByValue,
      footerButtonRefs,
    }),
    [store, value, selectPageByDirection, selectPageByValue, footerButtonRefs],
  );

  return { carousel };
}
