import { shorthands, mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { useBadgeStyles } from '../Badge/useBadgeStyles';
import type { CounterBadgeState } from './CounterBadge.types';

export const counterBadgeClassName = 'fui-CounterBadge';

const useStyles = makeStyles({
  dot: {
    minWidth: 'auto',
    width: '6px',
    height: '6px',
    ...shorthands.padding('0'),
  },
  hide: {
    display: 'none',
  },
});

/**
 * Applies style classnames to slots
 */
export const useCounterBadgeStyles = (state: CounterBadgeState): CounterBadgeState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    counterBadgeClassName,
    state.dot && styles.dot,
    !state.showZero && state.count === 0 && !state.dot && styles.hide,
    state.root.className,
  );
  return useBadgeStyles(state) as CounterBadgeState;
};
