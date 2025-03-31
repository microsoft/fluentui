import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';

import type { CarouselSlots, CarouselState } from './Carousel.types';

export const carouselClassNames: SlotClassNames<CarouselSlots> = {
  root: 'fui-Carousel',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    // Only hide horizontal overflow to enable focus border to bleed bounds vertically
    overflowX: 'hidden',
    overflowAnchor: 'none',
    position: 'relative',
  },
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useCarouselStyles_unstable = (state: CarouselState): CarouselState => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(carouselClassNames.root, styles.root, state.root.className);

  return state;
};
