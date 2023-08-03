/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { SliderState, SliderSlots } from './Slider.types';

/**
 * Render the final JSX of Slider
 */
export const renderSlider_unstable = (state: SliderState) => {
  const { slots, slotProps } = getSlotsNext<SliderSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.input {...slotProps.input} />
      <slots.rail {...slotProps.rail} />
      <slots.thumb {...slotProps.thumb} />
    </slots.root>
  );
};
