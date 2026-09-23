import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CounterBadgeSlots, CounterBadgeState } from './CounterBadge.types';
import { useBadgeStyles } from './useBadgeStyles.styles';
import styles from './Badge.module.css';

export const counterBadgeClassNames: SlotClassNames<CounterBadgeSlots> = {
  root: 'fui-CounterBadge',
  icon: 'fui-CounterBadge__icon',
};

export const useCounterBadgeStyles = (state: CounterBadgeState): CounterBadgeState => {
  useBadgeStyles(state);

  state.root.className = clsx(counterBadgeClassNames.root, styles.counterRoot, state.root.className);

  if (state.icon) {
    state.icon.className = clsx(counterBadgeClassNames.icon, state.icon.className);
  }

  return state;
};
