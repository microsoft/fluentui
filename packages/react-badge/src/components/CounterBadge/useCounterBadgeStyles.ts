import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { useBadgeStyles } from '../Badge/useBadgeStyles';
import type { CounterBadgeState } from './CounterBadge.types';

const useStyles = makeStyles({
  root: {
    minWidth: 'auto',
  },
  warning: theme => ({
    backgroundColor: '#c50f1f', // FIXME theme.global.palette.cranberry.primary,
    borderColor: '#c50f1f', // FIXME theme.global.palette.cranberry.primary,
  }),
  important: theme => ({
    backgroundColor: '#242424', // FIXME theme.global.palette.grey[14],
    borderColor: '#242424', // FIXME theme.global.palette.grey[14],
  }),
  severe: theme => ({
    // TODO: update these colors once the color used in the design spec has existing color token
    backgroundColor: '#d13438', // FIXME theme.global.palette.red.primary,
    borderColor: '#d13438', // FIXME theme.global.palette.red.primary,
  }),
  informative: theme => ({
    backgroundColor: '#ebebeb', // FIXME theme.global.palette.grey[92],
    borderColor: '#ebebeb', // FIXME theme.global.palette.grey[92],
    color: theme.colorNeutralForeground3,
  }),
  dot: {
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
export const useCounterBadgeStyles = (state: CounterBadgeState): CounterBadgeState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    styles.root,
    state.color === 'warning' && styles.warning,
    state.color === 'important' && styles.important,
    state.color === 'severe' && styles.severe,
    state.color === 'informative' && styles.informative,
    state.dot && styles.dot,
    !state.showZero && state.count === 0 && !state.dot && styles.hide,
    state.root.className,
  );
  return useBadgeStyles(state) as CounterBadgeState;
};
