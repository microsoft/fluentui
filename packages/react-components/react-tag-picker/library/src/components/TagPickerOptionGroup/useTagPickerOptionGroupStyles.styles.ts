'use client';

import { mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerOptionGroupSlots, TagPickerOptionGroupState } from './TagPickerOptionGroup.types';
import { useOptionGroupStyles_unstable } from '@fluentui/react-combobox';

export const tagPickerOptionGroupClassNames: SlotClassNames<TagPickerOptionGroupSlots> = {
  root: 'fui-TagPickerOptionGroup',
  label: 'fui-TagPickerOptionGroup__label',
};

/**
 * Apply styling to the TagPickerOptionGroup slots based on the state
 */
export const useTagPickerOptionGroupStyles = (state: TagPickerOptionGroupState): TagPickerOptionGroupState => {
  useOptionGroupStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(tagPickerOptionGroupClassNames.root, state.root.className);

  if (state.label) {
    // eslint-disable-next-line react-hooks/immutability
    state.label.className = mergeClasses(tagPickerOptionGroupClassNames.label, state.label.className);
  }

  return state;
};
