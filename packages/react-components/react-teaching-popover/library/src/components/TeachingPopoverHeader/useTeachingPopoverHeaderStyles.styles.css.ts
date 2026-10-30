import { clsx } from 'clsx';
import type { TeachingPopoverHeaderSlots, TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './TeachingPopoverHeader.module.css';

export const teachingPopoverHeaderClassNames: SlotClassNames<TeachingPopoverHeaderSlots> = {
  root: 'fui-TeachingPopoverHeader',
  dismissButton: 'fui-TeachingPopoverHeader__dismissButton',
  icon: 'fui-TeachingPopoverHeader__icon',
};

/** Applies style classnames to slots */
export const useTeachingPopoverHeaderStyles_unstable = (
  state: TeachingPopoverHeaderState,
): TeachingPopoverHeaderState => {
  const { appearance } = state;
  const brand = appearance === 'brand' && styles.brand;

  state.root.className = clsx(teachingPopoverHeaderClassNames.root, styles.root, brand, state.root.className);

  if (state.dismissButton) {
    state.dismissButton.className = clsx(
      teachingPopoverHeaderClassNames.dismissButton,
      styles.dismissButton,
      brand,
      state.dismissButton.className,
    );
  }

  if (state.icon) {
    state.icon.className = clsx(teachingPopoverHeaderClassNames.icon, styles.icon, brand, state.icon.className);
  }
  return state;
};
