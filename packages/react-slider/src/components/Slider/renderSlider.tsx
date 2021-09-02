import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { sliderShorthandProps } from './useSlider';
import type { SliderState } from './Slider.types';

/**
 * Render the final JSX of Slider
 */
export const renderSlider = (state: SliderState) => {
  const { slots, slotProps } = getSlotsCompat(state, sliderShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {state.marks && <slots.marksWrapper {...slotProps.marksWrapper} />}
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
