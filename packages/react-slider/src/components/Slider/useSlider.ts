import * as React from 'react';
import { getPartitionedNativeProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { useSliderState } from './useSliderState';
import { SliderProps, SliderSlots, SliderState } from './Slider.types';

/**
 * Array of all shorthand properties listed in sliderShorthandProps
 */
export const sliderShorthandProps: (keyof SliderSlots)[] = ['root', 'input', 'rail', 'thumb'];

/**
 * Given user props, returns state and render function for a Slider.
 */
export const useSlider = (props: SliderProps, ref: React.Ref<HTMLInputElement>): SliderState => {
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['onChange'],
  });

  const {
    // Props
    value,
    defaultValue,
    min = 0,
    max = 100,
    step,
    disabled,
    getAriaValueText,
    vertical,
    size = 'medium',
    origin,
    onChange,
    // Slots
    root,
    input,
    rail,
    thumb,
  } = props;

  const state: SliderState = {
    getAriaValueText,
    defaultValue,
    disabled,
    max,
    min,
    origin,
    size,
    step,
    vertical,
    value,
    onChange,
    components: {
      input: 'input',
      rail: 'div',
      root: 'div',
      thumb: 'div',
    },
    root: resolveShorthand(root, {
      required: true,
      defaultProps: {
        ...nativeProps.root,
      },
    }),
    input: resolveShorthand(input, {
      required: true,
      defaultProps: {
        id: useId('slider-', props.id),
        ref,
        ...nativeProps.primary,
        type: 'range',
        orient: vertical ? 'vertical' : '',
      } as SliderSlots['input'],
    }),
    rail: resolveShorthand(rail, { required: true }),
    thumb: resolveShorthand(thumb, { required: true }),
  };

  useSliderState(state);

  return state;
};
