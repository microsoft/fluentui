import { clsx } from 'clsx';
import type { TeachingPopoverTitleSlots, TeachingPopoverTitleState } from './TeachingPopoverTitle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './TeachingPopoverTitle.module.css';

export const teachingPopoverTitleClassNames: SlotClassNames<TeachingPopoverTitleSlots> = {
  root: 'fui-TeachingPopoverTitle',
  dismissButton: 'fui-TeachingPopoverTitle__dismissButton',
};

/** Applies style classnames to slots */
export const useTeachingPopoverTitleStyles_unstable = (state: TeachingPopoverTitleState): TeachingPopoverTitleState => {
  const { appearance } = state;
  const brand = appearance === 'brand' && styles.brand;

  state.root.className = clsx(teachingPopoverTitleClassNames.root, styles.root, brand, state.root.className);

  if (state.dismissButton) {
    state.dismissButton.className = clsx(
      teachingPopoverTitleClassNames.dismissButton,
      styles.dismissButton,
      brand,
      state.dismissButton.className,
    );
  }

  return state;
};
