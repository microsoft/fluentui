import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { SliderProps, SliderSlots, SliderState, SliderPublicRef } from './Slider.types';
import { useSliderState } from './useSliderState';

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
export const useSlider = (props: SliderProps, ref: React.RefObject<HTMLElement & SliderPublicRef>): SliderState => {
  const state: SliderState = {
    ref,
    ...props,
    sliderWrapper: resolveShorthand(props.sliderWrapper),
    rail: resolveShorthand(props.rail),
    trackWrapper: resolveShorthand(props.trackWrapper),
    track: resolveShorthand(props.track),
    marksContainer: resolveShorthand(props.marksContainer),
    thumbWrapper: resolveShorthand(props.thumbWrapper),
    thumb: resolveShorthand(props.thumb),
    activeRail: resolveShorthand(props.activeRail),
  };

  useSliderState(state);

  return state;
};
