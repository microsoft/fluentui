import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { OptionProps, useOption_unstable } from '@fluentui/react-combobox';
import type { PickerOptionProps, PickerOptionState } from './PickerOption.types';

/**
 * Create the state required to render PickerOption.
 *
 * The returned state can be modified with hooks such as usePickerOptionStyles_unstable,
 * before being passed to renderPickerOption_unstable.
 *
 * @param props - props from this instance of PickerOption
 * @param ref - reference to root HTMLDivElement of PickerOption
 */
export const usePickerOption_unstable = (
  props: PickerOptionProps,
  ref: React.Ref<HTMLDivElement>,
): PickerOptionState => {
  const baseState = useOption_unstable(props as OptionProps, ref);
  const state: PickerOptionState = {
    ...baseState,
    components: {
      ...baseState.components,
      media: 'div',
      secondaryContent: 'span',
    },
    media: slot.optional(props.media, { elementType: 'div' }),
    secondaryContent: slot.optional(props.secondaryContent, { elementType: 'span' }),
  };

  return state;
};
