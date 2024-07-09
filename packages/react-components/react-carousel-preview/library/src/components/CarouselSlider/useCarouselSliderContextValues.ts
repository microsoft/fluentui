import * as React from 'react';
import { CarouselSliderContextValues } from '../CarouselContext.types';
import { CarouselSliderState } from './CarouselSlider.types';

export function useCarouselSliderContextValues_unstable(state: CarouselSliderState): CarouselSliderContextValues {
  const { carouselSliderRef } = state;

  const slider = React.useMemo(
    () => ({
      carouselSliderRef,
    }),
    [carouselSliderRef],
  );

  return { slider };
}
