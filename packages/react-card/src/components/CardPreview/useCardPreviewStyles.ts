import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { CardPreviewState } from './CardPreview.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    position: 'relative',
    // TODO: Explore alternate way of applying padding on parent Card
    margin: '0 -12px',

    '> *': {
      display: 'block',
      width: '100%',
    },
  }),

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
export const useCardPreviewStyles = (state: CardPreviewState): CardPreviewState => {
  const styles = useStyles();
  state.root.className = mergeClasses('fluentui-react-card-preview', styles.root, state.root.className);

  if (state.logo) {
    state.logo.className = mergeClasses(styles.logo, state.logo.className);
  }

  return state;
};
