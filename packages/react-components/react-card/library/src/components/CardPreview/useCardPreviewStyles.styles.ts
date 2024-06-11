import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { CardPreviewSlots, CardPreviewState } from './CardPreview.types';

/**
 * Static CSS class names used internally for the component slots.
 */
export const cardPreviewClassNames: SlotClassNames<CardPreviewSlots> = {
  root: 'fui-CardPreview',
  logo: 'fui-CardPreview__logo',
};

const useStyles = makeStyles({
  root: {
    position: 'relative',

    [`> :not(.${cardPreviewClassNames.logo})`]: {
      display: 'block',
      height: '100%',
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
 * Apply styling to the CardPreview slots based on the state.
 */
export const useCardPreviewStyles_unstable = (state: CardPreviewState): CardPreviewState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(cardPreviewClassNames.root, styles.root, state.root.className);

  if (state.logo) {
    state.logo.className = mergeClasses(cardPreviewClassNames.logo, styles.logo, state.logo.className);
  }

  return state;
};
