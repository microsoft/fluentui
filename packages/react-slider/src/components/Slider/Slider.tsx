import * as React from 'react';
import { useSlider } from './useSlider';
import { SliderProps } from './Slider.types';
import { renderSlider } from './renderSlider';
import { useSliderStyles } from './useSliderStyles';

/**
 * Define a styled Slider, using the `useSlider` hook.
 * {@docCategory Slider}
 */
export const Slider = React.forwardRef<HTMLElement, SliderProps>((props, ref) => {
  const state = useSlider(props, ref);

  useSliderStyles(state);

  return renderSlider(state);
});
Slider.displayName = 'Slider';
