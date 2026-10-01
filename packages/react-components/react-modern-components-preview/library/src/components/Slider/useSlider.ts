'use client';

import type * as React from 'react';
import { useSlider as useSliderBase } from '@fluentui/react-headless-components-preview/slider';
import type { SliderProps, SliderState } from './Slider.types';

/**
 * Create the state required to render Slider.
 */
export const useSlider = (props: SliderProps, ref: React.Ref<HTMLInputElement>): SliderState => {
  const { size = 'medium', ...rest } = props;
  const state = useSliderBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-size': size,
    },
    size,
  };
};
