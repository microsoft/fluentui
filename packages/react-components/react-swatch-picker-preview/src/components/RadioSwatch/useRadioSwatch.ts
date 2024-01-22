import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
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
  const { icon, ...rest } = props;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });
  const picker = useRadioPickerContextValue_unstable();

  const swatch = slot.always(props.swatch, {
    defaultProps: { 'aria-hidden': true },
    elementType: 'span',
  });

  const newProps = {
    ...rest,
    role: 'radio',
    name: picker.name,
  };

  const state = {
    ...useRadio_unstable(newProps, ref),
    components: {
      root: 'span' as 'span',
      input: 'input' as 'input',
      icon: 'span' as 'span',
      swatch: 'span' as 'span',
    },
    swatch,
    size: picker.size,
    shape: picker.shape,
    icon: iconShorthand,
  };

  return useRadioSwatchState_unstable(state, props);
};
