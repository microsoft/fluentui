import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { useSliderState } from './useSliderState';
import { SliderProps, SliderSlots, SliderState } from './Slider.types';

/**
 * Array of all shorthand properties listed in sliderShorthandProps
 */
export const sliderShorthandProps: (keyof SliderSlots)[] = [
  'root',
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
export const useSlider = (props: SliderProps, ref: React.Ref<HTMLElement>): SliderState => {
  const {
    value,
    defaultValue,
    min,
    max,
    step = 1,
    keyboardStep,
    disabled,
    ariaValueText,
    onChange,
    marks,
    vertical,
    size = 'medium',
    origin,
    input,
    activeRail,
    thumb,
    marksWrapper,
    thumbWrapper,
    track,
    trackWrapper,
    rail,
    sliderWrapper,
  } = props;

  const state: SliderState = {
    value,
    defaultValue,
    min,
    max,
    step,
    keyboardStep,
    disabled,
    ariaValueText,
    onChange,
    marks,
    vertical,
    origin,
    size,
    root: getNativeElementProps('span', {
      ref,
      ...props,
      id: useId('slider-', props.id),
    }),
    components: {
      root: 'div',
      rail: 'div',
      sliderWrapper: 'div',
      trackWrapper: 'div',
      track: 'div',
      marksWrapper: 'div',
      thumbWrapper: 'div',
      thumb: 'div',
      activeRail: 'div',
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
  };

  useSliderState(state);

  return state;
};
