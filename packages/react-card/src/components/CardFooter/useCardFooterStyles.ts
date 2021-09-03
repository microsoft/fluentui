import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { CardFooterState } from './CardFooter.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',

    '> :first-child': {
      flexGrow: 1,

      display: 'flex',
      flexDirection: 'row',
      gap: '12px',
    },
  },
});

/**
 * Apply styling to the CardFooter slots based on the state
 */
export const useCardFooterStyles = (state: CardFooterState): CardFooterState => {
  const styles = useStyles();
  state.className = mergeClasses(styles.root, state.className);

  return state;
};
