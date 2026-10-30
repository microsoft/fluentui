import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerInputSlots, TagPickerInputState } from './TagPickerInput.types';
import styles from './TagPickerInput.module.css';

export const tagPickerInputClassNames: SlotClassNames<TagPickerInputSlots> = {
  root: 'fui-TagPickerInput',
};

export const useTagPickerInputStyles_unstable = (state: TagPickerInputState): TagPickerInputState => {
  state.root.className = clsx(
    tagPickerInputClassNames.root,
    styles.root,
    styles[state.size],
    state.disabled && styles.disabled,
    state.root.className,
  );
  return state;
};
