'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSlider } from './renderSlider';
import { useSlider } from './useSlider';
import { useSliderStyles } from './useSliderStyles.styles';
import type { SliderProps } from './Slider.types';

/**
 * Slider allows users to select a value from a range.
 */
export const Slider: ForwardRefComponent<SliderProps> = React.forwardRef<HTMLInputElement, SliderProps>(
  (props, ref) => {
    const state = useSlider(props, ref);

    useSliderStyles(state);

    return renderSlider(state);
  },
);

Slider.displayName = 'Slider';
