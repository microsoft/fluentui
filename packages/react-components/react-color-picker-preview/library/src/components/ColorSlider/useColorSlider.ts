import * as React from 'react';
import { getPartitionedNativeProps, useId, slot } from '@fluentui/react-utilities';
import type { ColorSliderProps, ColorSliderState } from './ColorSlider.types';
import { useColorSliderState_unstable } from './useColorSliderState';

/**
 * Create the state required to render ColorSlider.
 *
 * The returned state can be modified with hooks such as useColorSliderStyles_unstable,
 * before being passed to renderColorSlider_unstable.
 *
 * @param props - props from this instance of ColorSlider
 * @param ref - reference to root HTMLInputElement of ColorSlider
 */
export const useColorSlider_unstable = (
  props: ColorSliderProps,
  ref: React.Ref<HTMLInputElement>,
): ColorSliderState => {
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
  } = props;

  const state: ColorSliderState = {
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
      },
      elementType: 'input',
    }),
    rail: slot.always(rail, { elementType: 'div' }),
    thumb: slot.always(thumb, { elementType: 'div' }),
  };

  useColorSliderState_unstable(state, props);

  return state;
};
