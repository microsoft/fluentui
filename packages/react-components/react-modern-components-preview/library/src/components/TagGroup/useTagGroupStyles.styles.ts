import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagGroupSlots, TagGroupState } from './TagGroup.types';
import styles from './TagGroup.module.css';

export const tagGroupClassNames: SlotClassNames<TagGroupSlots> = {
  root: 'fui-TagGroup',
};

export const useTagGroupStyles = (state: TagGroupState): TagGroupState => {
  state.root.className = clsx(tagGroupClassNames.root, styles.root, state.root.className);
  return state;
};
