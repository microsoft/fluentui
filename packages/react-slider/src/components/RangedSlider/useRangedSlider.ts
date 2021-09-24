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
    marks,
    max,
    min,
    onChange,
    size = 'medium',
    step = 1,
    value,
    vertical,

    // Slots
    activeRail,
    lowerInput,
    lowerThumb,
    lowerThumbWrapper,
    marksWrapper,
    rail,
    sliderWrapper,
    track,
    trackWrapper,
    upperInput,
    upperThumb,
    upperThumbWrapper,
  } = props;

  const state: RangedSliderState = {
    ariaValueText,
    defaultValue,
    disabled,
    keyboardStep,
    marks,
    max,
    min,
    onChange,
    size,
    step,
    value,
    vertical,
    root: getNativeElementProps('span', {
      ref,
      ...props,
      id: useId('ranged-slider-', props.id),
    }),
    components: {
      activeRail: 'div',
      lowerInput: 'input',
      lowerThumb: 'div',
      lowerThumbWrapper: 'div',
      marksWrapper: 'div',
      rail: 'div',
      root: 'div',
      track: 'div',
      trackWrapper: 'div',
      sliderWrapper: 'div',
      upperInput: 'input',
      upperThumb: 'div',
      upperThumbWrapper: 'div',
    },
    activeRail: resolveShorthand(activeRail, { required: true }),
    lowerInput: resolveShorthand(lowerInput, {
      required: true,
      defaultProps: {
        type: 'range',
      },
    }),
    upperInput: resolveShorthand(upperInput, {
      required: true,
      defaultProps: {
        type: 'range',
      },
    }),
    lowerThumb: resolveShorthand(lowerThumb, { required: true }),
    lowerThumbWrapper: resolveShorthand(lowerThumbWrapper, { required: true }),
    marksWrapper: resolveShorthand(marksWrapper, { required: true }),
    rail: resolveShorthand(rail, { required: true }),
    track: resolveShorthand(track, { required: true }),
    trackWrapper: resolveShorthand(trackWrapper, { required: true }),
    sliderWrapper: resolveShorthand(sliderWrapper, { required: true }),
    upperThumb: resolveShorthand(upperThumb, { required: true }),
    upperThumbWrapper: resolveShorthand(upperThumbWrapper, { required: true }),
  };

  useRangedSliderState(state);

  return state;
};
