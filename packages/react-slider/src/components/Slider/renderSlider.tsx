import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { SliderSlots, SliderState } from './Slider.types';
import { sliderShorthandProps } from './useSlider';

/**
 * Render the final JSX of Slider
 */
export const renderSlider = (state: SliderState) => {
  const { slots, slotProps } = getSlots<SliderSlots>(state, sliderShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.rail {...slotProps.rail} />
      <slots.trackWrapper {...slotProps.trackWrapper}>
        <slots.track {...slotProps.track} />
      </slots.trackWrapper>
      {state.marks && <slots.marksContainer {...slotProps.marksContainer} />}
      <slots.thumbWrapper {...slotProps.thumbWrapper}>
        <slots.thumb {...slotProps.thumb} />
      </slots.thumbWrapper>
      <slots.activeRail {...slotProps.activeRail} />
    </slots.root>
  );
};
