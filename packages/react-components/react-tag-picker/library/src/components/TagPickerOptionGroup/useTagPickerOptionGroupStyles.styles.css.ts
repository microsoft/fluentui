'use client';

import { clsx } from 'clsx';
import { useOptionGroupStyles_unstable } from '@fluentui/react-combobox';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerOptionGroupSlots, TagPickerOptionGroupState } from './TagPickerOptionGroup.types';

export const tagPickerOptionGroupClassNames: SlotClassNames<TagPickerOptionGroupSlots> = {
  root: 'fui-TagPickerOptionGroup',
  label: 'fui-TagPickerOptionGroup__label',
};

export const useTagPickerOptionGroupStyles = (state: TagPickerOptionGroupState): TagPickerOptionGroupState => {
  useOptionGroupStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(tagPickerOptionGroupClassNames.root, state.root.className);
  if (state.label) {
    // eslint-disable-next-line react-hooks/immutability
    state.label.className = clsx(tagPickerOptionGroupClassNames.label, state.label.className);
  }
  return state;
};
