import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselNavSlots, CarouselNavState } from './CarouselNav.types';

export const carouselNavClassNames: SlotClassNames<CarouselNavSlots> = {
  root: 'fui-CarouselNav',
  // TODO: add class names for all slots on CarouselNavSlots.
  // Should be of the form `<slotName>: 'fui-CarouselNav__<slotName>`
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
 * Apply styling to the CarouselNav slots based on the state
 */
export const useCarouselNavStyles_unstable = (state: CarouselNavState): CarouselNavState => {
  const styles = useStyles();
  state.root.className = mergeClasses(carouselNavClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
