'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SliderProps } from './Slider.types';
import { useSlider } from './useSlider';
import { renderSlider } from './renderSlider';

/**
 * A slider component for selecting a value in a range.
 */
export const Slider: ForwardRefComponent<SliderProps> = React.forwardRef((props, ref) => {
  const state = useSlider(props, ref);

  return renderSlider(state);
});

Slider.displayName = 'Slider';
