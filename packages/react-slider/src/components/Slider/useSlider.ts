import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { useSliderState } from './useSliderState';
import { SliderProps, SliderShorthandProps, SliderState } from './Slider.types';
import { Tooltip } from '@fluentui/react-tooltip';

/**
 * Array of all shorthand properties listed in SliderShorthandProps
 */
export const sliderShorthandProps: SliderShorthandProps[] = [
  'rail',
  'sliderWrapper',
  'trackWrapper',
  'track',
  'thumbWrapper',
  'tooltip',
  'thumb',
  'activeRail',
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
      sliderWrapper: { as: 'div', children: null },
      rail: { as: 'div', children: null },
      trackWrapper: { as: 'div', children: null },
      track: { as: 'div', children: null },
      thumbWrapper: { as: 'div', children: null },
      // Tooltip's content prop is defined in useSliderState
      tooltip: { as: Tooltip, content: null },
      thumb: { as: 'div', children: null },
      activeRail: { as: 'div', children: null },
    },
    defaultProps && resolveShorthandProps(defaultProps, sliderShorthandProps),
    resolveShorthandProps(props, sliderShorthandProps),
  );

  useSliderState(state);

  return state;
};
