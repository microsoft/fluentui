'use client';

import { clsx } from 'clsx';
import { useTagGroupStyles_unstable } from '@fluentui/react-tags';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerGroupSlots, TagPickerGroupState } from './TagPickerGroup.types';
import { tagSizeToTagPickerSize } from '../../utils/tagPicker2Tag';
import styles from './TagPickerGroup.module.css';

export const tagPickerGroupClassNames: SlotClassNames<TagPickerGroupSlots> = {
  root: 'fui-TagPickerGroup',
};

export const useTagPickerGroupStyles_unstable = (state: TagPickerGroupState): TagPickerGroupState => {
  useTagGroupStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    tagPickerGroupClassNames.root,
    styles.root,
    styles[tagSizeToTagPickerSize(state.size)],
    state.root.className,
  );
  return state;
};
