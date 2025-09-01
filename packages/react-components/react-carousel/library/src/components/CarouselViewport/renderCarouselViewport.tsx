/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CarouselViewportState, CarouselViewportSlots } from './CarouselViewport.types';
import { CarouselSliderContextValues, CarouselSliderContextProvider } from '../CarouselSlider/CarouselSliderContext';

/**
 * Render the final JSX of CarouselViewport
 */
export const renderCarouselViewport_unstable = (
  state: CarouselViewportState,
  contextValues: CarouselSliderContextValues,
): JSXElement => {
  assertSlots<CarouselViewportSlots>(state);

  return (
    <CarouselSliderContextProvider value={contextValues.carouselSlider}>
      <state.root />
    </CarouselSliderContextProvider>
  );
};
