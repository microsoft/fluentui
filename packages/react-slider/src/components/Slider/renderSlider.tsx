import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SliderSlots, SliderRender } from './Slider.types';

/**
 * Render the final JSX of Slider
 */
export const renderSlider_unstable: SliderRender = state => {
  const { slots, slotProps } = getSlots<SliderSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.input {...slotProps.input} />
      <slots.rail {...slotProps.rail} />
      <slots.thumb {...slotProps.thumb} />
    </slots.root>
  );
};
