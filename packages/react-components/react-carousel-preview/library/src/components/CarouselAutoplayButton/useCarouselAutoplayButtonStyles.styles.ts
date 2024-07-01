import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselAutoplayButtonSlots, CarouselAutoplayButtonState } from './CarouselAutoplayButton.types';

export const carouselAutoplayButtonClassNames: SlotClassNames<CarouselAutoplayButtonSlots> = {
  root: 'fui-CarouselAutoplayButton',
  // TODO: add class names for all slots on CarouselAutoplayButtonSlots.
  // Should be of the form `<slotName>: 'fui-CarouselAutoplayButton__<slotName>`
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
 * Apply styling to the CarouselAutoplayButton slots based on the state
 */
export const useCarouselAutoplayButtonStyles_unstable = (
  state: CarouselAutoplayButtonState,
): CarouselAutoplayButtonState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(carouselAutoplayButtonClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
