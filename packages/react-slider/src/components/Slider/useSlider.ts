import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { useSliderState } from './useSliderState';
import type { SliderProps, SliderSlots, SliderState } from './Slider.types';

/**
 * Array of all shorthand properties listed in SliderShorthandProps
 */
export const sliderShorthandProps: Array<keyof SliderSlots> = [
  'rail',
  'sliderWrapper',
  'trackWrapper',
  'track',
  'marksContainer',
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
    size: 'medium',
    ...props,
    sliderWrapper: resolveShorthand(props.sliderWrapper, { required: true }),
    rail: resolveShorthand(props.rail, { required: true }),
    trackWrapper: resolveShorthand(props.trackWrapper, { required: true }),
    track: resolveShorthand(props.track, { required: true }),
    marksContainer: resolveShorthand(props.marksContainer, { required: true }),
    thumbWrapper: resolveShorthand(props.thumbWrapper, { required: true }),
    thumb: resolveShorthand(props.thumb, { required: true }),
    activeRail: resolveShorthand(props.activeRail, { required: true }),
  };

  useSliderState(state);

  return state;
};
