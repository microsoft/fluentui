import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { RangedSliderState, RangedSliderSlots } from './RangedSlider.types';

/**
 * Render the final JSX of RangedSlider
 */
export const renderRangedSlider = (state: RangedSliderState) => {
  const { slots, slotProps } = getSlots<RangedSliderSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {state.marks && <slots.marksWrapper {...slotProps.marksWrapper} />}
      <slots.sliderWrapper {...slotProps.sliderWrapper}>
        <slots.rail {...slotProps.rail} />
        <slots.trackWrapper {...slotProps.trackWrapper}>
          <slots.track {...slotProps.track} />
        </slots.trackWrapper>
        <slots.lowerThumbWrapper {...slotProps.lowerThumbWrapper}>
          <slots.lowerInput {...slotProps.lowerInput} />
          <slots.lowerThumb {...slotProps.lowerThumb} />
        </slots.lowerThumbWrapper>
        <slots.upperThumbWrapper {...slotProps.upperThumbWrapper}>
          <slots.upperInput {...slotProps.upperInput} />
          <slots.upperThumb {...slotProps.upperThumb} />
        </slots.upperThumbWrapper>
        <slots.activeRail {...slotProps.activeRail} />
      </slots.sliderWrapper>
    </slots.root>
  );
};
