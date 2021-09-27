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
    // Props
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

    // Slots
    activeRail,
    input,
    marksWrapper,
    rail,
    sliderWrapper,
    thumb,
    thumbWrapper,
    track,
    trackWrapper,
  } = props;

  const state: SliderState = {
    ariaValueText,
    defaultValue,
    disabled,
    keyboardStep,
    marks,
    max,
    min,
    onChange,
    origin,
    size,
    step,
    vertical,
    value,
    components: {
      activeRail: 'div',
      input: 'input',
      marksWrapper: 'div',
      rail: 'div',
      root: 'div',
      sliderWrapper: 'div',
      thumb: 'div',
      thumbWrapper: 'div',
      track: 'div',
      trackWrapper: 'div',
    },
    root: getNativeElementProps('span', {
      ref,
      ...props,
      id: useId('slider-', props.id),
    }),
    activeRail: resolveShorthand(activeRail, { required: true }),
    input: resolveShorthand(input, {
      required: true,
      defaultProps: {
        type: 'range',
      },
    }),
    marksWrapper: resolveShorthand(marksWrapper, { required: true }),
    rail: resolveShorthand(rail, { required: true }),
    sliderWrapper: resolveShorthand(sliderWrapper, { required: true }),
    thumb: resolveShorthand(thumb, { required: true }),
    thumbWrapper: resolveShorthand(thumbWrapper, { required: true }),
    track: resolveShorthand(track, { required: true }),
    trackWrapper: resolveShorthand(trackWrapper, { required: true }),
  };

  useSliderState(state);

  return state;
};
