'use client';

import type * as React from 'react';
import { useId, slot } from '@fluentui/react-utilities';
import type {
  AlphaSliderBaseProps,
  AlphaSliderBaseState,
  AlphaSliderProps,
  AlphaSliderState,
} from './AlphaSlider.types';
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
  const { shape = shapeFromContext, ...baseProps } = props;

  return {
    ...useAlphaSliderBase_unstable(baseProps, ref),
    shape,
  };
};

export const useAlphaSliderBase_unstable = (
  props: AlphaSliderBaseProps,
  ref: React.Ref<HTMLInputElement>,
): AlphaSliderBaseState => {
  const {
    vertical,
    // Slots
    root,
    input,
    rail,
    thumb,
    // Root props
    className,
    style,
    // Handled by useAlphaSliderState_unstable
    color,
    defaultColor,
    onChange,
    transparency,
    ...primaryProps
  } = props;

  const state: AlphaSliderBaseState = {
    vertical,
    components: {
      input: 'input',
      rail: 'div',
      root: 'div',
      thumb: 'div',
    },
    root: slot.always(root, {
      defaultProps: { className, style },
      elementType: 'div',
    }),
    input: slot.always(input, {
      defaultProps: {
        id: useId('slider-', props.id),
        ref,
        'aria-orientation': vertical ? 'vertical' : 'horizontal',
        ...primaryProps,
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
