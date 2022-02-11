import * as React from 'react';
import { useSlider_unstable } from './useSlider';
import type { SliderProps } from './Slider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The Slider component allows users to quickly select a value by dragging a thumb across a rail.
 */
export const Slider: ForwardRefComponent<SliderProps> = React.forwardRef((props, ref) => {
  const [state, render] = useSlider_unstable(props, ref);
  return render(state);
});
Slider.displayName = 'Slider';
