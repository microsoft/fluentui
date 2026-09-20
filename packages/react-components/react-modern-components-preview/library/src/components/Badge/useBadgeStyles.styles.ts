import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { BadgeSlots, BadgeState } from './Badge.types';
import styles from './Badge.module.css';

export const badgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-Badge',
  icon: 'fui-Badge__icon',
};

/**
 * Apply styling to the Badge slots based on the state.
 */
export const useBadgeStyles = (state: BadgeState): BadgeState => {
  state.root.className = clsx(badgeClassNames.root, styles.root, state.root.className);

  if (state.icon) {
    state.icon.className = clsx(badgeClassNames.icon, styles.icon, state.icon.className);
  }

  return state;
};
