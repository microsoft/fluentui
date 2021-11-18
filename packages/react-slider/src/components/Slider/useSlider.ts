import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { useSliderState } from './useSliderState';
import { SliderProps, SliderSlots, SliderState } from './Slider.types';

/**
 * Array of all shorthand properties listed in sliderShorthandProps
 */
export const sliderShorthandProps: (keyof SliderSlots)[] = ['root', 'input', 'rail', 'thumb', 'track'];

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
    vertical,
    size = 'medium',
    origin,

    // Slots
    input,
    rail,
    thumb,
    track,
  } = props;

  const state: SliderState = {
    ariaValueText,
    defaultValue,
    disabled,
    keyboardStep,
    max,
    min,
    onChange,
    origin,
    size,
    step,
    vertical,
    value,
    components: {
      input: 'input',
      rail: 'div',
      root: 'div',
      thumb: 'div',
      track: 'div',
    },
    root: getNativeElementProps('span', {
      ref,
      ...props,
      id: useId('slider-', props.id),
    }),
    input: resolveShorthand(input, {
      required: true,
      defaultProps: {
        type: 'range',
      },
    }),
    rail: resolveShorthand(rail, { required: true }),
    thumb: resolveShorthand(thumb, { required: true }),
    track: resolveShorthand(track, { required: true }),
  };

  useSliderState(state);

  return state;
};
