import * as React from 'react';
import { getPartitionedNativeProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { useSliderState_unstable } from './useSliderState';
import { SliderProps, SliderState } from './Slider.types';

export const useSlider_unstable = (props: SliderProps, ref: React.Ref<HTMLInputElement>): SliderState => {
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['onChange', 'size'],
  });

  const {
    disabled,
    vertical,
    size = 'medium',
    // Slots
    root,
    input,
    rail,
    thumb,
  } = props;

  const state: SliderState = {
    disabled,
    size,
    vertical,
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
        orient: vertical ? 'vertical' : undefined,
      },
    }),
    rail: resolveShorthand(rail, { required: true }),
    thumb: resolveShorthand(thumb, { required: true }),
  };

  useSliderState_unstable(state, props);

  return state;
};
