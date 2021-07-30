import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { SliderProps, SliderShorthandProps, SliderState, SliderPublicRef } from './Slider.types';
import { useSliderState } from './useSliderState';

/**
 * Array of all shorthand properties listed in SliderShorthandProps
 */
export const sliderShorthandProps: SliderShorthandProps[] = ['rail', 'track', 'thumb', 'activeRail'];

const mergeProps = makeMergeProps<SliderState>({ deepMerge: sliderShorthandProps });

/**
 * Create the state required to render Slider.
 *
 * The returned state can be modified with hooks such as useSliderStyles,
 * before being passed to renderSlider.
 *
 * @param props - props from this instance of Slider
 * @param ref - reference to root HTMLElement of Slider
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useSlider = (
  props: SliderProps,
  ref: React.RefObject<HTMLElement & SliderPublicRef>,
  defaultProps?: SliderProps,
): SliderState => {
  const state = mergeProps(
    {
      ref,
      className: 'ms-Slider-root',
      rail: { as: 'div', children: null },
      track: { as: 'div', children: null },
      thumb: { as: 'div', children: null },
      activeRail: { as: 'div', children: null },
    },
    defaultProps && resolveShorthandProps(defaultProps, sliderShorthandProps),
    resolveShorthandProps(props, sliderShorthandProps),
  );

  useSliderState(state);

  return state;
};
