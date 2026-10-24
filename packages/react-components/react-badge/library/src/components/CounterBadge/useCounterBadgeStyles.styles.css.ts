'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { BadgeSlots } from '../Badge/Badge.types';
import { useBadgeStyles_unstable } from '../Badge/useBadgeStyles.styles.css';
import styles from './CounterBadge.module.css';
import type { CounterBadgeState } from './CounterBadge.types';

export const counterBadgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-CounterBadge',
  icon: 'fui-CounterBadge__icon',
};

export const useCounterBadgeStyles_unstable = (state: CounterBadgeState): CounterBadgeState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    counterBadgeClassNames.root,
    state.dot && styles.dot,
    !state.root.children && !state.dot && styles.hide,
    state.root.className,
  );

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(counterBadgeClassNames.icon, state.icon.className);
  }

  return useBadgeStyles_unstable(state) as CounterBadgeState;
};
