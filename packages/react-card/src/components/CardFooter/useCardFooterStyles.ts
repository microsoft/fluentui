import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { CardFooterState } from './CardFooter.types';

export const cardFooterClassName = 'fui-CardFooter';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.gap('12px'),
  },
  action: {
    marginLeft: 'auto',
  },
});

/**
 * Apply styling to the CardFooter slots based on the state
 */
export const useCardFooterStyles_unstable = (state: CardFooterState): CardFooterState => {
  const styles = useStyles();
  state.root.className = mergeClasses(cardFooterClassName, styles.root, state.root.className);

  if (state.action) {
    state.action.className = mergeClasses(styles.action, state.action.className);
  }

  return state;
};
