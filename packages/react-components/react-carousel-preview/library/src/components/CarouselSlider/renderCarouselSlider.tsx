/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselSliderState, CarouselSliderSlots } from './CarouselSlider.types';
import { CarouselSliderContextValues } from '../CarouselContext.types';
import { CarouselSliderProvider } from '../CarouselSliderContext';

/**
 * Render the final JSX of CarouselSlider
 */
export const renderCarouselSlider_unstable = (
  state: CarouselSliderState,
  contextValues: CarouselSliderContextValues,
) => {
  assertSlots<CarouselSliderSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <CarouselSliderProvider value={contextValues.slider}>
      <state.root>
        <state.slider>{state.root.children}</state.slider>
      </state.root>
    </CarouselSliderProvider>
  );
};
