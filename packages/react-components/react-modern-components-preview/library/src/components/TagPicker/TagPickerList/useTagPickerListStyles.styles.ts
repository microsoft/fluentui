import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerListSlots, TagPickerListState } from './TagPickerList.types';
import styles from './TagPickerList.module.css';

export const tagPickerListClassNames: SlotClassNames<TagPickerListSlots> = { root: 'fui-TagPickerList' };

export const useTagPickerListStyles = (state: TagPickerListState): TagPickerListState => {
  state.root.className = clsx(
    tagPickerListClassNames.root,
    styles.root,
    !state.open && styles.collapsed,
    state.root.className,
  );
  return state;
};
