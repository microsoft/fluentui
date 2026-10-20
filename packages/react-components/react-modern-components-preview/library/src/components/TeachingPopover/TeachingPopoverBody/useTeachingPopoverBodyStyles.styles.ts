import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TeachingPopoverBodySlots, TeachingPopoverBodyState } from './TeachingPopoverBody.types';
import styles from './TeachingPopoverBody.module.css';

export const teachingPopoverBodyClassNames: SlotClassNames<TeachingPopoverBodySlots> = {
  root: 'fui-TeachingPopoverBody',
  media: 'fui-TeachingPopoverBody__media',
};

export const useTeachingPopoverBodyStyles = (state: TeachingPopoverBodyState): TeachingPopoverBodyState => {
  state.root.className = clsx(teachingPopoverBodyClassNames.root, styles.root, state.root.className);
  if (state.media) {
    state.media.className = clsx(teachingPopoverBodyClassNames.media, styles.media, state.media.className);
  }
  return state;
};
