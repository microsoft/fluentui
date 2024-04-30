import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselButtonSlots, CarouselButtonState } from './CarouselButton.types';

export const carouselButtonClassNames: SlotClassNames<CarouselButtonSlots> = {
  root: 'fui-CarouselButton',
  // TODO: add class names for all slots on CarouselButtonSlots.
  // Should be of the form `<slotName>: 'fui-CarouselButton__<slotName>`
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
 * Apply styling to the CarouselButton slots based on the state
 */
export const useCarouselButtonStyles_unstable = (state: CarouselButtonState): CarouselButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(carouselButtonClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
