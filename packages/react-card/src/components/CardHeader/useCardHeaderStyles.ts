import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { CardHeaderState } from './CardHeader.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
    height: '32px',
  },
  image: {
    minWidth: '24px',
    minHeight: '24px',
    maxWidth: '32px',
    maxHeight: '32px',

    display: 'flex',
    alignItems: 'center',

    '> *': {
      minWidth: 'inherit',
      minHeight: 'inherit',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  },

  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: 'inherit',

    '> *': {
      height: '50%',
    },
  },
});

/**
 * Apply styling to the CardHeader slots based on the state
 */
export const useCardHeaderStyles = (state: CardHeaderState): CardHeaderState => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  if (state.image) {
    state.image.className = mergeClasses(styles.image, state.image.className);
  }

  if (state.content) {
    state.content.className = mergeClasses(styles.textContainer, state.content.className);
  }

  return state;
};
