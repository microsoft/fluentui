import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselNavButtonSlots, CarouselNavButtonState } from './CarouselNavButton.types';

export const carouselNavButtonClassNames: SlotClassNames<CarouselNavButtonSlots> = {
  root: 'fui-CarouselNavButton',
  // TODO: add class names for all slots on CarouselNavButtonSlots.
  // Should be of the form `<slotName>: 'fui-CarouselNavButton__<slotName>`
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
 * Apply styling to the CarouselNavButton slots based on the state
 */
export const useCarouselNavButtonStyles_unstable = (state: CarouselNavButtonState): CarouselNavButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(carouselNavButtonClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
