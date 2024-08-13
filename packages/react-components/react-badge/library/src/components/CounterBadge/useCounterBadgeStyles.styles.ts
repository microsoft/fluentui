import { mergeClasses, makeStyles } from '@griffel/react';
import { useBadgeStyles_unstable } from '../Badge/useBadgeStyles.styles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { BadgeSlots } from '../Badge/Badge.types';
import type { CounterBadgeState } from './CounterBadge.types';

export const counterBadgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-CounterBadge',
  icon: 'fui-CounterBadge__icon',
};

const useStyles = makeStyles({
  dot: {
    minWidth: 'auto',
    width: '6px',
    height: '6px',
    padding: '0',
  },
  hide: {
    display: 'none',
  },
});

/**
 * Applies style classnames to slots
 */
export const useCounterBadgeStyles_unstable = (state: CounterBadgeState): CounterBadgeState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(
    counterBadgeClassNames.root,
    state.dot && styles.dot,
    !state.root.children && !state.dot && styles.hide,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(counterBadgeClassNames.icon, state.icon.className);
  }

  return useBadgeStyles_unstable(state) as CounterBadgeState;
};
