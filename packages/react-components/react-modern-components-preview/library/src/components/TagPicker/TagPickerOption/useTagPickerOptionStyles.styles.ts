import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerOptionSlots, TagPickerOptionState } from './TagPickerOption.types';
import styles from './TagPickerOption.module.css';

export const tagPickerOptionClassNames: SlotClassNames<TagPickerOptionSlots> = {
  root: 'fui-TagPickerOption',
  media: 'fui-TagPickerOption__media',
  secondaryContent: 'fui-TagPickerOption__secondaryContent',
};

export const useTagPickerOptionStyles = (state: TagPickerOptionState): TagPickerOptionState => {
  state.root.className = clsx(
    tagPickerOptionClassNames.root,
    styles.root,
    state.secondaryContent && styles.withSecondaryContent,
    state.root.className,
  );
  if (state.media) {
    state.media.className = clsx(tagPickerOptionClassNames.media, styles.media, state.media.className);
  }
  if (state.secondaryContent) {
    state.secondaryContent.className = clsx(
      tagPickerOptionClassNames.secondaryContent,
      styles.secondaryContent,
      state.secondaryContent.className,
    );
  }
  if (state.checkIcon) {
    state.checkIcon.className = clsx('fui-Option__checkIcon', styles.checkIcon, state.checkIcon.className);
  }
  return state;
};
