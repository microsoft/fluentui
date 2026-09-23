'use client';

import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CounterBadgeSlots, CounterBadgeState } from './CounterBadge.types';
import { useBadgeStyles } from '../Badge/useBadgeStyles.styles';
import styles from './CounterBadge.module.css';

export const counterBadgeClassNames: SlotClassNames<CounterBadgeSlots> = {
  root: 'fui-CounterBadge',
  icon: 'fui-CounterBadge__icon',
};

export const useCounterBadgeStyles = (state: CounterBadgeState): CounterBadgeState => {
  useBadgeStyles(state);

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(counterBadgeClassNames.root, styles.root, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(counterBadgeClassNames.icon, state.icon.className);
  }

  return state;
};
