'use client';

import { clsx } from 'clsx';
import { useOptionStyles_unstable } from '@fluentui/react-combobox';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerOptionSlots, TagPickerOptionState } from './TagPickerOption.types';
import styles from './TagPickerOption.module.css';

export const tagPickerOptionClassNames: SlotClassNames<TagPickerOptionSlots> = {
  root: 'fui-TagPickerOption',
  media: 'fui-TagPickerOption__media',
  secondaryContent: 'fui-TagPickerOption__secondaryContent',
};

export const useTagPickerOptionStyles_unstable = (state: TagPickerOptionState): TagPickerOptionState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    tagPickerOptionClassNames.root,
    styles.root,
    state.secondaryContent && styles.withSecondaryContent,
    state.root.className,
  );
  useOptionStyles_unstable({
    ...state,
    active: false,
    disabled: false,
    focusVisible: false,
    checkIcon: undefined,
    selected: false,
  });
  if (state.media) {
    // eslint-disable-next-line react-hooks/immutability
    state.media.className = clsx(tagPickerOptionClassNames.media, styles.media, state.media.className);
  }
  if (state.secondaryContent) {
    // eslint-disable-next-line react-hooks/immutability
    state.secondaryContent.className = clsx(
      tagPickerOptionClassNames.secondaryContent,
      styles.secondaryContent,
      state.secondaryContent.className,
    );
  }
  return state;
};
