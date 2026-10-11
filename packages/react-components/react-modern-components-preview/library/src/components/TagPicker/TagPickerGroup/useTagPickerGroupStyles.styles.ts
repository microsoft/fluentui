import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerGroupSlots, TagPickerGroupState } from './TagPickerGroup.types';
import styles from './TagPickerGroup.module.css';

export const tagPickerGroupClassNames: SlotClassNames<TagPickerGroupSlots> = { root: 'fui-TagPickerGroup' };

export const useTagPickerGroupStyles = (state: TagPickerGroupState): TagPickerGroupState => {
  state.root.className = clsx(tagPickerGroupClassNames.root, styles.root, state.root.className);
  return state;
};
