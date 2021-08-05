import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
// import { SliderState } from './Slider.types';
import { sliderShorthandProps } from './useSlider';

/**
 * Render the final JSX of Slider
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderSlider = (state: any) => {
  const { slots, slotProps } = getSlotsCompat(state, sliderShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropriate place */}
      {state.children}
    </slots.root>
  );
};
