import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { useRangedSliderState } from './useRangedSliderState';
import { RangedSliderProps, RangedSliderState } from './RangedSlider.types';

/**
 * Given user props, returns state and render function for a RangedSlider.
 */
export const useRangedSlider = (props: RangedSliderProps, ref: React.Ref<HTMLElement>): RangedSliderState => {
  const {
    // Props
    ariaValueText,
    defaultValue,
    disabled,
    keyboardStep,
    max,
    min,
    onChange,
    size = 'medium',
    step = 1,
    value,
    vertical,

    // Slots
    activeRail,
    inputLower,
    inputUpper,
    lowerThumb,
    lowerThumbWrapper,
    marks,
    marksWrapper,
    rail,
    sliderWrapper,
    track,
    trackWrapper,
    upperThumb,
    upperThumbWrapper,
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
