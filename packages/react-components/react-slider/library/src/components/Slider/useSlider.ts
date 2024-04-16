import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { getPartitionedNativeProps, useId, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useSliderState_unstable } from './useSliderState';
import { SliderProps, SliderState } from './Slider.types';
import { useFocusWithin } from '@fluentui/react-tabster';

export const useSlider_unstable = (props: SliderProps, ref: React.Ref<HTMLInputElement>): SliderState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true });

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
    root: slot.always(root, {
      defaultProps: nativeProps.root,
      elementType: 'div',
    }),
    input: slot.always(input, {
      defaultProps: {
        id: useId('slider-', props.id),
        ref,
        ...nativeProps.primary,
        type: 'range',
        orient: vertical ? 'vertical' : undefined,
      },
      elementType: 'input',
    }),
    rail: slot.always(rail, { elementType: 'div' }),
    thumb: slot.always(thumb, { elementType: 'div' }),
  };

  state.root.ref = useMergedRefs(state.root.ref, useFocusWithin<HTMLDivElement>());

  useSliderState_unstable(state, props);

  return state;
};
