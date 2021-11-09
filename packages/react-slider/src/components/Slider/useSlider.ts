import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { useSliderState } from './useSliderState';
import { SliderProps, SliderSlots, SliderState } from './Slider.types';

/**
 * Array of all shorthand properties listed in sliderShorthandProps
 */
export const sliderShorthandProps: (keyof SliderSlots)[] = ['root', 'activeRail', 'input', 'rail', 'thumb', 'track'];

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
    rail,
    thumb,
    track,
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
    activeRail: resolveShorthand(activeRail, { required: true }),
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
