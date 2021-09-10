import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { rangedSliderShorthandProps } from './useRangedSlider';
import type { RangedSliderState, RangedSliderSlots } from './RangedSlider.types';

/**
 * Render the final JSX of RangedSlider
 */
export const renderRangedSlider = (state: RangedSliderState) => {
  const { slots, slotProps } = getSlots<RangedSliderSlots>(state, rangedSliderShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {state.marks && <slots.marksWrapper {...slotProps.marksWrapper} />}
      <slots.sliderWrapper {...slotProps.sliderWrapper}>
        <slots.rail {...slotProps.rail} />
        <slots.trackWrapper {...slotProps.trackWrapper}>
          <slots.track {...slotProps.track} />
        </slots.trackWrapper>
        <slots.lowerThumbWrapper {...slotProps.lowerThumbWrapper}>
          <slots.lowerThumb {...slotProps.lowerThumb} />
        </slots.lowerThumbWrapper>
        <slots.upperThumbWrapper {...slotProps.upperThumbWrapper}>
          <slots.upperThumb {...slotProps.upperThumb} />
        </slots.upperThumbWrapper>
        <slots.activeRail {...slotProps.activeRail} />
        <slots.inputLower {...slotProps.inputLower} />
        <slots.inputUpper {...slotProps.inputUpper} />
      </slots.sliderWrapper>
    </slots.root>
  );
};
