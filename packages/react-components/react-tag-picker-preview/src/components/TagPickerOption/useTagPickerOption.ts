import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { OptionProps, useOption_unstable } from '@fluentui/react-combobox';
import type { TagPickerOptionProps, TagPickerOptionState } from './TagPickerOption.types';

/**
 * Create the state required to render TagPickerOption.
 *
 * The returned state can be modified with hooks such as useTagPickerOptionStyles_unstable,
 * before being passed to renderTagPickerOption_unstable.
 *
 * @param props - props from this instance of TagPickerOption
 * @param ref - reference to root HTMLDivElement of TagPickerOption
 */
export const useTagPickerOption_unstable = (
  props: TagPickerOptionProps,
  ref: React.Ref<HTMLDivElement>,
): TagPickerOptionState => {
  const optionState = useOption_unstable(props as OptionProps, ref);
  const state: TagPickerOptionState = {
    components: {
      ...optionState.components,
      media: 'div',
      secondaryContent: 'span',
    },
    media: slot.optional(props.media, {
      elementType: 'div',
    }),
    secondaryContent: slot.optional(props.secondaryContent, {
      elementType: 'span',
    }),
    root: optionState.root,
  };

  return state;
};
