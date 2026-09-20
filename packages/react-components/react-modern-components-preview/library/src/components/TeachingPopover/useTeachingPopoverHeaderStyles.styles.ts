import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TeachingPopoverHeaderSlots, TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';
import styles from './TeachingPopoverHeader.module.css';

export const teachingPopoverHeaderClassNames: SlotClassNames<TeachingPopoverHeaderSlots> = {
  root: 'fui-TeachingPopoverHeader',
  dismissButton: 'fui-TeachingPopoverHeader__dismissButton',
  icon: 'fui-TeachingPopoverHeader__icon',
};

export const useTeachingPopoverHeaderStyles = (state: TeachingPopoverHeaderState): TeachingPopoverHeaderState => {
  state.root.className = clsx(teachingPopoverHeaderClassNames.root, styles.root, state.root.className);
  if (state.dismissButton) {
    state.dismissButton.className = clsx(
      teachingPopoverHeaderClassNames.dismissButton,
      styles.dismissButton,
      state.dismissButton.className,
    );
  }
  if (state.icon) {
    state.icon.className = clsx(teachingPopoverHeaderClassNames.icon, styles.icon, state.icon.className);
  }
  return state;
};
