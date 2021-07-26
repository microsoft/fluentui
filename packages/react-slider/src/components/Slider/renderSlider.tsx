import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { SliderState } from './Slider.types';
import { sliderShorthandProps } from './useSlider';

/**
 * Render the final JSX of Slider
 */
export const renderSlider = (state: SliderState) => {
  const { slots, slotProps } = getSlotsCompat(state, sliderShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.rail {...slotProps.rail} />
      <slots.track {...slotProps.track} />
      <slots.thumb {...slotProps.thumb} />
      <slots.activeRail {...slotProps.activeRail} />
    </slots.root>
  );
};
