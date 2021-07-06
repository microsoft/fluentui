import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { CounterBadgeState } from './CounterBadge.types';
import { useBadgeStyles } from '../Badge/useBadgeStyles';

const useStyles = makeStyles({
  root: {
    minWidth: 'auto',
  },
  warning: theme => ({
    backgroundColor: theme.global.palette.cranberry.primary,
    borderColor: theme.global.palette.cranberry.primary,
  }),
  important: theme => ({
    backgroundColor: theme.global.palette.grey[14],
    borderColor: theme.global.palette.grey[14],
  }),
  severe: theme => ({
    // TODO: update these colors once the color used in the design spec has existing color token
    backgroundColor: theme.global.palette.red.primary,
    borderColor: theme.global.palette.red.primary,
  }),
  informative: theme => ({
    backgroundColor: theme.global.palette.grey[92],
    borderColor: theme.global.palette.grey[92],
    color: theme.alias.color.neutral.neutralForeground3,
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
  state.className = mergeClasses(
    styles.root,
    state.color === 'warning' && styles.warning,
    state.color === 'important' && styles.important,
    state.color === 'severe' && styles.severe,
    state.color === 'informative' && styles.informative,
    state.dot && styles.dot,
    !state.showZero && state.count === 0 && !state.dot && styles.hide,
    state.className,
  );
  return useBadgeStyles(state) as CounterBadgeState;
};
