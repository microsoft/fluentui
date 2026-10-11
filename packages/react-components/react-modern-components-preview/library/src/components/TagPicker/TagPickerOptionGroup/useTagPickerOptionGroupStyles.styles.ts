import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerOptionGroupSlots, TagPickerOptionGroupState } from './TagPickerOptionGroup.types';
import styles from './TagPickerOptionGroup.module.css';

export const tagPickerOptionGroupClassNames: SlotClassNames<TagPickerOptionGroupSlots> = {
  root: 'fui-TagPickerOptionGroup',
  label: 'fui-TagPickerOptionGroup__label',
};

export const useTagPickerOptionGroupStyles = (state: TagPickerOptionGroupState): TagPickerOptionGroupState => {
  state.root.className = clsx(tagPickerOptionGroupClassNames.root, styles.root, state.root.className);
  if (state.label) {
    state.label.className = clsx(tagPickerOptionGroupClassNames.label, styles.label, state.label.className);
  }
  return state;
};
