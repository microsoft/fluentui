import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { RadioSwatchProps, RadioSwatchState } from './RadioSwatch.types';
import { useRadio_unstable } from '@fluentui/react-radio';
import { useRadioSwatchState_unstable } from './useRadioSwatchState';
import { useRadioPickerContextValue_unstable } from '../RadioPicker/RadioPickerContext';

/**
 * Create the state required to render RadioSwatch.
 *
 * The returned state can be modified with hooks such as useRadioSwatchStyles_unstable,
 * before being passed to renderRadioSwatch_unstable.
 *
 * @param props - props from this instance of RadioSwatch
 * @param ref - reference to root HTMLElement of RadioSwatch
 */
export const useRadioSwatch_unstable = (
  props: RadioSwatchProps,
  ref: React.Ref<HTMLInputElement>,
): RadioSwatchState => {
  const { icon } = props;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });
  const picker = useRadioPickerContextValue_unstable();
  const state = {
    ...useRadio_unstable(props, ref),
    components: {
      root: 'span',
      input: 'input',
      icon: 'span',
    },
    // root: slot.always(
    //   getIntrinsicElementProps('input', {
    //     ref: ref as React.Ref<HTMLInputElement>,
    //     ...props,
    //     size: picker.size,
    //   }),
    //   { elementType: Radio },
    // ),
    size: picker.size,
    shape: picker.shape,
    icon: iconShorthand,
  };

  return useRadioSwatchState_unstable(state, props);
};
