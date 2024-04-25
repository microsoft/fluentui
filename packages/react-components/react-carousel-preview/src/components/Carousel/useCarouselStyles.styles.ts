import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselSlots, CarouselState } from './Carousel.types';

export const carouselClassNames: SlotClassNames<CarouselSlots> = {
  root: 'fui-Carousel',
  // TODO: add class names for all slots on CarouselSlots.
  // Should be of the form `<slotName>: 'fui-Carousel__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    // TODO Add default styles for the root element
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useCarouselStyles_unstable = (state: CarouselState): CarouselState => {
  const styles = useStyles();
  state.root.className = mergeClasses(carouselClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
