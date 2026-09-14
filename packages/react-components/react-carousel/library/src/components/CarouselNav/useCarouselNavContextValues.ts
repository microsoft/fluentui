'use client';

import * as React from 'react';
import type { CarouselNavContextValues } from './CarouselNavContext';
import type { CarouselNavState } from './CarouselNav.types';

export function useCarouselNavContextValues_unstable(state: CarouselNavState): CarouselNavContextValues {
  const { appearance } = state;
  const carouselNav = React.useMemo(() => ({ appearance }), [appearance]);

  return { carouselNav };
}
