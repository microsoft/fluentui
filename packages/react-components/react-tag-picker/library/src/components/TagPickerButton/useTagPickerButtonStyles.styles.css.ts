import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerButtonSlots, TagPickerButtonState } from './TagPickerButton.types';
import styles from './TagPickerButton.module.css';

export const tagPickerButtonClassNames: SlotClassNames<TagPickerButtonSlots> = {
  root: 'fui-TagPickerButton',
};

export const useTagPickerButtonStyles_unstable = (state: TagPickerButtonState): TagPickerButtonState => {
  state.root.className = clsx(
    tagPickerButtonClassNames.root,
    styles.root,
    styles[state.size],
    state.hasSelectedOption && styles.hasSelectedOption,
    state.root.className,
  );
  return state;
};
