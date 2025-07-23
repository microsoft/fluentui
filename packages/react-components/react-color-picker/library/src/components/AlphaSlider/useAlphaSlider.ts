import * as React from 'react';
import { getPartitionedNativeProps, useId, slot } from '@fluentui/react-utilities';
import type { AlphaSliderProps, AlphaSliderState } from './AlphaSlider.types';
import { useAlphaSliderState_unstable } from './useAlphaSliderState';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';

/**
 * Create the state required to render AlphaSlider.
 *
 * The returned state can be modified with hooks such as useAlphaSliderStyles_unstable,
 * before being passed to renderAlphaSlider_unstable.
 *
 * @param props - props from this instance of AlphaSlider
 * @param ref - reference to root HTMLInputElement of AlphaSlider
 */
export const useAlphaSlider_unstable = (
  props: AlphaSliderProps,
  ref: React.Ref<HTMLInputElement>,
): AlphaSliderState => {
  const shapeFromContext = useColorPickerContextValue_unstable(ctx => ctx.shape);
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['onChange', 'color'],
  });

  const {
    shape = shapeFromContext,
    vertical,
    // Slots
    root,
    input,
    rail,
    thumb,
  } = props;

  const state: AlphaSliderState = {
    shape,
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

  useAlphaSliderState_unstable(state, props);

  return state;
};
