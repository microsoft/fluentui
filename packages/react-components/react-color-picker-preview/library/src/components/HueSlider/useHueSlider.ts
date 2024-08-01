import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { getPartitionedNativeProps, useId, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useHueSliderState_unstable } from './useHueSliderState';
import { HueSliderProps, HueSliderState } from './HueSlider.types';
import { useFocusWithin } from '@fluentui/react-tabster';

export const useHueSlider_unstable = (props: HueSliderProps, ref: React.Ref<HTMLInputElement>): HueSliderState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true });

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['onChange'],
  });

  const {
    vertical,
    // Slots
    root,
    input,
    rail,
    thumb,
    channel = 'hue',
  } = props;

  const state: HueSliderState = {
    vertical,
    channel,
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

  useHueSliderState_unstable(state, props);

  return state;
};
