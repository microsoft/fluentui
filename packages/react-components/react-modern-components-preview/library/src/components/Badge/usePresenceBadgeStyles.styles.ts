import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { PresenceBadgeSlots, PresenceBadgeState } from './PresenceBadge.types';
import styles from './Badge.module.css';

export const presenceBadgeClassNames: SlotClassNames<PresenceBadgeSlots> = {
  root: 'fui-PresenceBadge',
  icon: 'fui-PresenceBadge__icon',
};

export const usePresenceBadgeStyles = (state: PresenceBadgeState): PresenceBadgeState => {
  state.root.className = clsx(presenceBadgeClassNames.root, styles.presenceRoot, state.root.className);

  if (state.icon) {
    state.icon.className = clsx(presenceBadgeClassNames.icon, styles.presenceIcon, state.icon.className);
  }

  return state;
};
