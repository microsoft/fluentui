import * as React from 'react';
import { useSlider_unstable } from './useSlider';
import { renderSlider_unstable } from './renderSlider';
import { useSliderStyles_unstable } from './useSliderStyles';
import type { SliderProps } from './Slider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * The Slider component allows users to quickly select a value by dragging a thumb across a rail.
 */
export const Slider: ForwardRefComponent<SliderProps> = React.forwardRef((props, ref) => {
  const state = useSlider_unstable(props, ref);

  useSliderStyles_unstable(state);

  const { useSliderStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderSlider_unstable(state);
});
Slider.displayName = 'Slider';
