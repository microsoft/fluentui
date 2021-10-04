import * as React from 'react';
import { useSlider } from './useSlider';
import { renderSlider } from './renderSlider';
import { useSliderStyles } from './useSliderStyles';
import type { SliderProps } from './Slider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The Slider component allows users to quickly select a value by dragging a thumb across a rail.
 */
export const Slider: ForwardRefComponent<SliderProps> = React.forwardRef((props, ref) => {
  const state = useSlider(props, ref);

  useSliderStyles(state);

  return renderSlider(state);
});
Slider.displayName = 'Slider';
