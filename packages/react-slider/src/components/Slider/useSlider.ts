import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { useSliderState } from './useSliderState';
import { SliderProps, SliderShorthandProps, SliderState } from './Slider.types';

/**
 * Array of all shorthand properties listed in SliderShorthandProps
 */
export const sliderShorthandProps: SliderShorthandProps[] = [
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
export const useSlider = (props: SliderProps, ref: React.Ref<HTMLElement>, defaultProps?: SliderProps): SliderState => {
  const mergeProps = makeMergeProps<SliderState>({
    deepMerge: sliderShorthandProps,
  });

  const state = mergeProps(
    {
      ref,
      as: 'div',
      sliderWrapper: { as: 'div', children: null },
      rail: { as: 'div', children: null },
      trackWrapper: { as: 'div', children: null },
      track: { as: 'div', children: null },
      thumbWrapper: { as: 'div', children: null },
      marksWrapper: { as: 'div', children: null },
      thumb: { as: 'div', children: null },
      activeRail: { as: 'div', children: null },
      input: { as: 'input', type: 'range', children: null },
    },
    defaultProps && resolveShorthandProps(defaultProps, sliderShorthandProps),
    resolveShorthandProps(props, sliderShorthandProps),
  );

  useSliderState(state);

  return state;
};
