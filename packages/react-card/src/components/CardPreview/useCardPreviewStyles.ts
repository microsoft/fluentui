import { makeStyles, mergeClasses } from '@griffel/react';
import type { CardPreviewState } from './CardPreview.types';

export const cardPreviewClassName = 'fui-CardPreview';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'relative',

    '> *': {
      display: 'block',
      width: '100%',
    },
  },

  logo: {
    position: 'absolute',
    bottom: '12px',
    left: '12px',
    width: '32px',
    height: '32px',
  },
});

/**
 * Apply styling to the CardPreview slots based on the state
 */
export const useCardPreviewStyles_unstable = (state: CardPreviewState): CardPreviewState => {
  const styles = useStyles();
  state.root.className = mergeClasses(cardPreviewClassName, styles.root, state.root.className);

  if (state.logo) {
    state.logo.className = mergeClasses(styles.logo, state.logo.className);
  }

  return state;
};
