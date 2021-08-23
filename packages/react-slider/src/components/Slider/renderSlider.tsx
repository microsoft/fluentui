import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { sliderShorthandProps } from './useSlider';
import type { SliderSlots, SliderState } from './Slider.types';

/**
 * Render the final JSX of Slider
 */
export const renderSlider = (state: SliderState) => {
  const { slots, slotProps } = getSlots<SliderSlots>(state, sliderShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {state.marks && <slots.marksContainer {...slotProps.marksContainer} />}
      <slots.sliderWrapper {...slotProps.sliderWrapper}>
        <slots.rail {...slotProps.rail} />
        <slots.trackWrapper {...slotProps.trackWrapper}>
          <slots.track {...slotProps.track} />
        </slots.trackWrapper>
        <slots.thumbWrapper {...slotProps.thumbWrapper}>
          <slots.thumb {...slotProps.thumb} />
        </slots.thumbWrapper>
        <slots.activeRail {...slotProps.activeRail} />
      </slots.sliderWrapper>
    </slots.root>
  );
};
