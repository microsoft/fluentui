import * as React from 'react';
import { useFieldContext } from '@fluentui/react-field';
import { getPartitionedNativeProps, resolveShorthand, useId, useMergedRefs } from '@fluentui/react-utilities';
import { useSliderState_unstable } from './useSliderState';
import { SliderProps, SliderState } from './Slider.types';
import { useFocusWithin } from '@fluentui/react-tabster';

export const useSlider_unstable = (props: SliderProps, ref: React.Ref<HTMLInputElement>): SliderState => {
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['onChange', 'size'],
  });

  const fieldSize = useFieldContext(field => field?.size);

  const {
    disabled,
    vertical,
    size = fieldSize === 'small' ? 'small' : 'medium',
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
      defaultProps: nativeProps.root,
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

  state.root.ref = useMergedRefs(state.root.ref, useFocusWithin<HTMLDivElement>());

  useSliderState_unstable(state, props);

  return state;
};
