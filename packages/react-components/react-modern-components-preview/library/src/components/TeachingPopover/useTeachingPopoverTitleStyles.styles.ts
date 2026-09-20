import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TeachingPopoverTitleSlots, TeachingPopoverTitleState } from './TeachingPopoverTitle.types';
import styles from './TeachingPopoverTitle.module.css';

export const teachingPopoverTitleClassNames: SlotClassNames<TeachingPopoverTitleSlots> = {
  root: 'fui-TeachingPopoverTitle',
  dismissButton: 'fui-TeachingPopoverTitle__dismissButton',
};

export const useTeachingPopoverTitleStyles = (state: TeachingPopoverTitleState): TeachingPopoverTitleState => {
  state.root.className = clsx(teachingPopoverTitleClassNames.root, styles.root, state.root.className);
  if (state.dismissButton) {
    state.dismissButton.className = clsx(
      teachingPopoverTitleClassNames.dismissButton,
      styles.dismissButton,
      state.dismissButton.className,
    );
  }
  return state;
};
