import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { useRangedSliderState } from './useRangedSliderState';
import { RangedSliderProps, RangedSliderSlots, RangedSliderState } from './RangedSlider.types';

/**
 * Array of all shorthand properties listed in RangedSliderSlots.
 */
export const rangedSliderShorthandProps: (keyof RangedSliderSlots)[] = [
  'root',
  'activeRail',
  'inputLower',
  'inputUpper',
  'rail',
  'sliderWrapper',
  'lowerThumb',
  'lowerThumbWrapper',
  'upperThumb',
  'upperThumbWrapper',
  'track',
  'trackWrapper',
  'marksWrapper',
];

/**
 * Given user props, returns state and render function for a RangedSlider.
 */
export const useRangedSlider = (props: RangedSliderProps, ref: React.Ref<HTMLElement>): RangedSliderState => {
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
    inputLower,
    inputUpper,
    activeRail,
    marksWrapper,
    lowerThumbWrapper,
    upperThumbWrapper,
    lowerThumb,
    upperThumb,
    track,
    trackWrapper,
    rail,
    sliderWrapper,
  } = props;

  const state: RangedSliderState = {
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
      lowerThumbWrapper: 'div',
      lowerThumb: 'div',
      upperThumbWrapper: 'div',
      upperThumb: 'div',
      activeRail: 'div',
      inputLower: 'input',
      inputUpper: 'input',
    },
    sliderWrapper: resolveShorthand(sliderWrapper, { required: true }),
    rail: resolveShorthand(rail, { required: true }),
    trackWrapper: resolveShorthand(trackWrapper, { required: true }),
    track: resolveShorthand(track, { required: true }),
    lowerThumbWrapper: resolveShorthand(lowerThumbWrapper, { required: true }),
    lowerThumb: resolveShorthand(lowerThumb, { required: true }),
    upperThumbWrapper: resolveShorthand(upperThumbWrapper, { required: true }),
    upperThumb: resolveShorthand(upperThumb, { required: true }),
    marksWrapper: resolveShorthand(marksWrapper, { required: true }),
    activeRail: resolveShorthand(activeRail, { required: true }),
    inputLower: resolveShorthand(inputLower, {
      required: true,
      defaultProps: {
        type: 'range',
      },
    }),
    inputUpper: resolveShorthand(inputUpper, {
      required: true,
      defaultProps: {
        type: 'range',
      },
    }),
  };

  useRangedSliderState(state);

  return state;
};
