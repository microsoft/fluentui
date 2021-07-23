import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { SliderState } from './Slider.types';
import { sliderShorthandProps } from './useSlider';

/**
 * Render the final JSX of Slider
 */
export const renderSlider = (state: SliderState) => {
  const { slots, slotProps } = getSlotsCompat(state, sliderShorthandProps);

  //     transform: translate(-50%, -50%); on thumb to center it on its container
  return (
    <slots.root {...slotProps.root}>
      <slots.rail {...slotProps.rail} />
      <slots.track {...slotProps.track} />
      {/* <div
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          opacity: '0.5',
          left: 50,
          right: 50,
          top: 0,
          bottom: 0,
        }}
      > */}
      <slots.thumbContainer {...slotProps.thumbContainer}>
        <slots.thumb {...slotProps.thumb} />
      </slots.thumbContainer>
      {/* </div> */}
    </slots.root>
  );
};
