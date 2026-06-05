'use client';

import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselAutoplayButtonSlots, CarouselAutoplayButtonState } from './CarouselAutoplayButton.types';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import { tokens } from '@fluentui/react-theme';

export const carouselAutoplayButtonClassNames: SlotClassNames<CarouselAutoplayButtonSlots> = {
  root: 'fui-CarouselAutoplayButton',
  icon: 'fui-CarouselAutoplayButton__icon',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    pointerEvents: 'all',
    marginTop: 'auto',
    marginBottom: 'auto',
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    color: tokens.colorNeutralForeground2,
    backgroundColor: tokens.colorNeutralBackgroundAlpha,
    ':hover': {
      cursor: 'pointer',
    },
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the CarouselAutoplayButton slots based on the state
 */
export const useCarouselAutoplayButtonStyles_unstable = (
  state: CarouselAutoplayButtonState,
): CarouselAutoplayButtonState => {
  const styles = useStyles();

  useToggleButtonStyles_unstable(state);

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(carouselAutoplayButtonClassNames.root, styles.root, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = mergeClasses(carouselAutoplayButtonClassNames.icon, state.icon.className);
  }

  return state;
};
