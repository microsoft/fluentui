import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerInputSlots, TagPickerInputState } from './TagPickerInput.types';
import styles from './TagPickerInput.module.css';

export const tagPickerInputClassNames: SlotClassNames<TagPickerInputSlots> = { root: 'fui-TagPickerInput' };

export const useTagPickerInputStyles = (state: TagPickerInputState): TagPickerInputState => {
  state.root.className = clsx(tagPickerInputClassNames.root, styles.root, state.root.className);
  return state;
};
