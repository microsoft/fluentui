import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselButtonSlots, CarouselButtonState } from './CarouselButton.types';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import { tokens } from '@fluentui/react-theme';

export const carouselButtonClassNames: SlotClassNames<CarouselButtonSlots> = {
  root: 'fui-CarouselButton',
  icon: 'fui-CarouselButton__icon',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    marginTop: 'auto',
    marginBottom: 'auto',
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    color: tokens.colorNeutralForeground2,
    backgroundColor: tokens.colorNeutralBackgroundAlpha,
    ':hover': {
      cursor: 'pointer',
    },
  },
});

/**
 * Apply styling to the CarouselButton slots based on the state
 */
export const useCarouselButtonStyles_unstable = (state: CarouselButtonState): CarouselButtonState => {
  'use no memo';

  const styles = useStyles();

  state = {
    ...state,
    ...useButtonStyles_unstable(state),
  };

  state.root.className = mergeClasses(carouselButtonClassNames.root, styles.root, state.root.className);
  if (state.icon) {
    state.icon.className = mergeClasses(carouselButtonClassNames.icon, state.icon.className);
  }

  return state;
};
