import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { SliderProps, SliderSlots, SliderState } from './Slider.types';
import { useSliderState } from './useSliderState';

/**
 * Array of all shorthand properties listed in SliderShorthandProps
 */
export const sliderShorthandProps: Array<keyof SliderSlots> = [
  'rail',
  'trackWrapper',
  'track',
  'thumbWrapper',
  'thumb',
  'activeRail',
];

/**
 * Given user props, returns state and render function for a Slider.
 */
export const useSlider = (props: SliderProps, ref: React.Ref<HTMLElement>): SliderState => {
  const state: SliderState = {
    ref,
    ...props,
    rail: resolveShorthand(props.rail, { required: true }),
    trackWrapper: resolveShorthand(props.trackWrapper, { required: true }),
    track: resolveShorthand(props.track, { required: true }),
    thumbWrapper: resolveShorthand(props.thumbWrapper, { required: true }),
    thumb: resolveShorthand(props.thumb, { required: true }),
    activeRail: resolveShorthand(props.activeRail, { required: true }),
  };

  useSliderState(state);

  return state;
};
