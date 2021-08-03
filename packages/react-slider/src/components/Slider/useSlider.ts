import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { SliderProps, SliderSlots, SliderState, SliderPublicRef } from './Slider.types';
import { useSliderState } from './useSliderState';

/**
 * Array of all shorthand properties listed in SliderShorthandProps
 */
export const sliderShorthandProps: Array<keyof SliderSlots> = ['rail', 'track', 'thumb', 'activeRail'];

/**
 * Given user props, returns state and render function for a Slider.
 */
export const useSlider = (props: SliderProps, ref: React.RefObject<HTMLElement & SliderPublicRef>): SliderState => {
  const state: SliderState = {
    ref,
    ...props,
    rail: resolveShorthand(props.rail),
    track: resolveShorthand(props.track),
    thumb: resolveShorthand(props.thumb),
    activeRail: resolveShorthand(props.activeRail),
  };

  useSliderState(state);

  return state;
};
