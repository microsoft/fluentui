'use client';

import type * as React from 'react';
import { useSliderBase_unstable } from '@fluentui/react-slider';

import type { SliderProps, SliderState } from './Slider.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a Slider component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSlider`.
 */
export const useSlider = (props: SliderProps, ref: React.Ref<HTMLInputElement>): SliderState => {
  'use no memo';

  const state: SliderState = useSliderBase_unstable(props, ref);

  // Set data attributes for disabled and vertical states to simplify styling of these states.
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-vertical'] = stringifyDataAttribute(state.vertical);

  return state;
};
