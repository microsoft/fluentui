import { useSlider } from './useSlider';
import { renderSlider } from './renderSlider';
import { useSliderStyles } from './useSliderStyles';
import type { SliderProps } from './Slider.types';
import { forwardRef } from '@fluentui/react-utilities';

/**
 * Define a styled Slider, using the `useSlider` hook
 */
export const Slider = forwardRef<SliderProps>((props, ref) => {
  const state = useSlider(props, ref);

  useSliderStyles(state);

  return renderSlider(state);
});
Slider.displayName = 'Slider';
