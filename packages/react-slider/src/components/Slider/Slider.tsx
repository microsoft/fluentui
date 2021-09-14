import * as React from 'react';
import { useSlider } from './useSlider';
import { renderSlider } from './renderSlider';
import { useSliderStyles } from './useSliderStyles';
import type { SliderProps } from './Slider.types';

/**
 * Define a styled Slider, using the `useSlider` hook
 */
export const Slider: React.ForwardRefExoticComponent<SliderProps> = React.forwardRef((props, ref) => {
  const state = useSlider(props, ref);

  useSliderStyles(state);

  return renderSlider(state);
});
Slider.displayName = 'Slider';
