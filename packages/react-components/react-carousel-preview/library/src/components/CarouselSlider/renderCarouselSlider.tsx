/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselSliderState, CarouselSliderSlots } from './CarouselSlider.types';

/**
 * Render the final JSX of CarouselSlider
 */
export const renderCarouselSlider_unstable = (state: CarouselSliderState) => {
  assertSlots<CarouselSliderSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <state.root>
      <state.slider>{state.root.children}</state.slider>
    </state.root>
  );
};
