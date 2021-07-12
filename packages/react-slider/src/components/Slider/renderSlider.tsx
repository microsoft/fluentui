import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { SliderState } from './Slider.types';
import { sliderShorthandProps } from './useSlider';

/**
 * Render the final JSX of Slider
 */
export const renderSlider = (state: SliderState) => {
  const { slots, slotProps } = getSlots(state, sliderShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropriate place */}
      {state.children}
    </slots.root>
  );
};
