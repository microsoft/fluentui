'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSlider, useSlider } from '@fluentui/react-headless-components-preview/slider';

import type { SliderProps, SliderState } from './Slider.types';
import { useSliderStyles } from './useSliderStyles';

/**
 * A Slider lets people select a value from a range. Windmod Slider: the headless slider
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Slider: ForwardRefComponent<SliderProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // `size` must be destructured out: it is on react-utilities' input allow-list and the headless
  // input is the primary slot, so a forwarded `size` reaches the range input.
  const { size = 'medium', ...rest } = props;

  const state: SliderState = {
    ...useSlider(rest, ref),
    size,
  };

  return renderSlider(useSliderStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<SliderProps>;

Slider.displayName = 'Slider';
