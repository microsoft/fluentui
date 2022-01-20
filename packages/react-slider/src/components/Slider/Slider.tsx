import * as React from 'react';
import { useSlider_unstable } from './useSlider';
import { renderSlider } from './renderSlider';
import { useSliderStyles_unstable } from './useSliderStyles';
import type { SliderProps } from './Slider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The Slider component allows users to quickly select a value by dragging a thumb across a rail.
 */
export const Slider: ForwardRefComponent<SliderProps> = React.forwardRef((props, ref) => {
  const state = useSlider_unstable(props, ref);

  useSliderStyles_unstable(state);

  return renderSlider(state);
});
Slider.displayName = 'Slider';
