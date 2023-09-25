import * as React from 'react';
import { useSlider_unstable } from './useSlider';
import { renderSlider_unstable } from './renderSlider';
import { useSliderStyles_unstable } from './useSliderStyles.styles';
import type { SliderProps } from './Slider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * The Slider component allows users to quickly select a value by dragging a thumb across a rail.
 */
export const Slider: ForwardRefComponent<SliderProps> = React.forwardRef((props, ref) => {
  const state = useSlider_unstable(props, ref);

  useSliderStyles_unstable(state);

  useCustomStyleHook_unstable('useSliderStyles_unstable')(state);

  return renderSlider_unstable(state);
});
Slider.displayName = 'Slider';
