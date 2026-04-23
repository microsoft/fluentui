'use client';

import * as React from 'react';
import type { CarouselSliderContextValues } from './CarouselSliderContext';
import type { CarouselSliderState } from './CarouselSlider.types';

export function useCarouselSliderContextValues_unstable(state: CarouselSliderState): CarouselSliderContextValues {
  const { cardFocus } = state;
  const carouselSlider = React.useMemo(() => ({ cardFocus }), [cardFocus]);

  return { carouselSlider };
}
