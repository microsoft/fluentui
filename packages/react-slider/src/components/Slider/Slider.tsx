import * as React from 'react';
import { useSlider } from './useSlider';
import { renderSlider } from './renderSlider';
import { useSliderStyles } from './useSliderStyles';
import type { SliderProps } from './Slider.types';

/**
 * The Slider component allows users to quickly select a value by dragging a thumb across a rail.
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const state = useSlider(props, ref);

  useSliderStyles(state);

  return renderSlider(state);
});
Slider.displayName = 'Slider';
