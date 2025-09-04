/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CarouselSliderState, CarouselSliderSlots } from './CarouselSlider.types';
import { CarouselSliderContextProvider, CarouselSliderContextValues } from './CarouselSliderContext';

/**
 * Render the final JSX of CarouselSlider
 */
export const renderCarouselSlider_unstable = (
  state: CarouselSliderState,
  contextValues: CarouselSliderContextValues,
): JSXElement => {
  assertSlots<CarouselSliderSlots>(state);

  return (
    <CarouselSliderContextProvider value={contextValues.carouselSlider}>
      <state.root />
    </CarouselSliderContextProvider>
  );
};
