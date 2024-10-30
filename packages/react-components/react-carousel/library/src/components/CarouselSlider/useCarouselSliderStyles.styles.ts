import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';

import type { CarouselSliderSlots, CarouselSliderState } from './CarouselSlider.types';
import { tokens } from '@fluentui/react-theme';

export const carouselSliderClassNames: SlotClassNames<CarouselSliderSlots> = {
  root: 'fui-CarouselSlider',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    overflowAnchor: 'none',
  },
  cardFocus: {
    // Ensure room for focus border inside overflow:hidden container
    paddingTop: tokens.strokeWidthThick,
  },
});

/**
 * Apply styling to the CarouselSlider slots based on the state
 */
export const useCarouselSliderStyles_unstable = (state: CarouselSliderState): CarouselSliderState => {
  'use no memo';
  const { cardFocus } = state;

  const styles = useStyles();

  state.root.className = mergeClasses(
    carouselSliderClassNames.root,
    styles.root,
    cardFocus && styles.cardFocus,
    state.root.className,
  );

  return state;
};
