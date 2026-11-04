'use client';

import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { cardCSSVars } from '../Card/cardCSSVars';
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

const useLayoutStyles = makeStyles({
  full: {
    [cardCSSVars.cardChildMarginVar]: `calc(-1 * var(${cardCSSVars.cardSizeVar}))`,
  },
  contained: {
    [cardCSSVars.cardChildMarginVar]: '0',
    borderRadius: tokens.borderRadiusXLarge,
  },
});

/**
 * Apply styling to the CardPreview slots based on the state.
 */
export const useCardPreviewStyles_unstable = (state: CardPreviewState): CardPreviewState => {
  const styles = useStyles();
  const layoutStyles = useLayoutStyles();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(
    cardPreviewClassNames.root,
    styles.root,
    layoutStyles[state.layout],
    state.root.className,
  );

  if (state.logo) {
    // eslint-disable-next-line react-hooks/immutability
    state.logo.className = mergeClasses(cardPreviewClassNames.logo, styles.logo, state.logo.className);
  }

  return state;
};
