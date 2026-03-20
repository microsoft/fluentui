'use client';

import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { getPartitionedNativeProps, useId, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useSliderState_unstable } from './useSliderState';
import { SliderBaseProps, SliderBaseState, SliderProps, SliderState } from './Slider.types';
import { useFocusWithin } from '@fluentui/react-tabster';

export const useSlider_unstable = (props: SliderProps, ref: React.Ref<HTMLInputElement>): SliderState => {
  const { size = 'medium', ...baseProps } = props;

  const baseState = useSliderBase_unstable(baseProps, ref);

  return {
    ...baseState,
    size,
  };
};

/**
 * Base hook for Slider component, which manages state related to slots structure, ARIA attributes,
 * keyboard handling, and controlled/uncontrolled value state.
 *
 * @param props - User provided props to the Slider component.
 * @param ref - User provided ref to be passed to the Slider input element.
 */
export const useSliderBase_unstable = (props: SliderBaseProps, ref: React.Ref<HTMLInputElement>): SliderBaseState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true });

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['onChange'],
  });

  const {
    disabled,
    vertical,
    // Slots
    root,
    input,
    rail,
    thumb,
  } = props;

  const state: SliderBaseState = {
    disabled,
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
