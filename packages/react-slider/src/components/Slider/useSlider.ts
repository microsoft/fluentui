import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { useSliderState } from './useSliderState';
import { SliderProps, SliderSlots, SliderState } from './Slider.types';

/**
 * Array of all shorthand properties listed in SliderShorthandProps
 */
export const sliderShorthandProps: (keyof SliderSlots)[] = [
  'activeRail',
  'input',
  'rail',
  'sliderWrapper',
  'thumb',
  'thumbWrapper',
  'track',
  'trackWrapper',
  'marksWrapper',
];

/**
 * Given user props, returns state and render function for a Slider.
 */
export const useInput = (props: SliderProps, ref: React.Ref<HTMLElement>): SliderState => {
  const { input, activeRail, thumb, marksWrapper, thumbWrapper, track, trackWrapper, rail, sliderWrapper } = props;

  const state = {
    components: {
      input: 'input',
    },
    sliderWrapper: resolveShorthand(sliderWrapper, { required: true }),
    rail: resolveShorthand(rail, { required: true }),
    trackWrapper: resolveShorthand(trackWrapper, { required: true }),
    track: resolveShorthand(track, { required: true }),
    thumbWrapper: resolveShorthand(thumbWrapper, { required: true }),
    marksWrapper: resolveShorthand(marksWrapper, { required: true }),
    thumb: resolveShorthand(thumb, { required: true }),
    activeRail: resolveShorthand(activeRail, { required: true }),
    input: resolveShorthand(input, {
      required: true,
      defaultProps: {
        type: 'range',
      },
    }),
    root: getNativeElementProps('span', {
      ref,
      ...props,
    }),
    ...props,
  };

  useSliderState(state);

  return state;
};
