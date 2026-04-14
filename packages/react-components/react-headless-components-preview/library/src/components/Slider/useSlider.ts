'use client';

import type * as React from 'react';
import { useSliderBase_unstable } from '@fluentui/react-slider';

import type { SliderProps, SliderState } from './Slider.types';

/**
 * Returns the state for a Slider component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSlider`.
 */
export const useSlider = (props: SliderProps, ref: React.Ref<HTMLInputElement>): SliderState => {
  const state: SliderState = useSliderBase_unstable(props, ref);

  return state;
};
