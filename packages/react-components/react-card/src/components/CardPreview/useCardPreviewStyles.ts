import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { CardPreviewSlots, CardPreviewState } from './CardPreview.types';

/**
 * @deprecated Use `cardPreviewClassNames.root` instead.
 */
export const cardPreviewClassName = 'fui-CardPreview';
export const cardPreviewClassNames: SlotClassNames<CardPreviewSlots> = {
  root: 'fui-CardPreview',
  logo: 'fui-CardPreview__logo',
};

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
  state.root.className = mergeClasses(cardPreviewClassNames.root, styles.root, state.root.className);

  if (state.logo) {
    state.logo.className = mergeClasses(cardPreviewClassNames.logo, styles.logo, state.logo.className);
  }

  return state;
};
