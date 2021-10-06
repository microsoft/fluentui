import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { CardFooterState } from './CardFooter.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
  },
  action: {
    marginLeft: 'auto',
  },
});

/**
 * Apply styling to the CardFooter slots based on the state
 */
export const useCardFooterStyles = (state: CardFooterState): CardFooterState => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  if (state.action) {
    state.action.className = mergeClasses(styles.action, state.action.className);
  }

  return state;
};
