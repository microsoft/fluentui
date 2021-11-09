import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { sliderShorthandProps } from './useSlider';
import type { SliderState, SliderSlots } from './Slider.types';

/**
 * Render the final JSX of Slider
 */
export const renderSlider = (state: SliderState) => {
  const { slots, slotProps } = getSlots<SliderSlots>(state, sliderShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.rail {...slotProps.rail} />
      <slots.track {...slotProps.track} />
      <slots.thumb {...slotProps.thumb} />
      <slots.input {...slotProps.input} />
    </slots.root>
  );
};
