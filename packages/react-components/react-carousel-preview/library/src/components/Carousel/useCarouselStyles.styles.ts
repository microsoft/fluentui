import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselSlots, CarouselState } from './Carousel.types';

export const carouselClassNames: SlotClassNames<CarouselSlots> = {
  root: 'fui-Carousel',
};

// TODO: Enable varying sizes w/ tokens
const PeekSize = '100px';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
  rootPeek: {
    position: 'relative',
    marginRight: PeekSize,
    marginLeft: PeekSize,
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useCarouselStyles_unstable = (state: CarouselState): CarouselState => {
  'use no memo';

  const { peeking } = state;
  const styles = useStyles();

  state.root.className = mergeClasses(
    carouselClassNames.root,
    styles.root,
    peeking && styles.rootPeek,
    state.root.className,
  );

  return state;
};
