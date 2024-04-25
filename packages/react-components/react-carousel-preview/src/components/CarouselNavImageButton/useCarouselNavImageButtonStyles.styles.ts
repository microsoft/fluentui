import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselNavImageButtonSlots, CarouselNavImageButtonState } from './CarouselNavImageButton.types';

export const carouselNavImageButtonClassNames: SlotClassNames<CarouselNavImageButtonSlots> = {
  root: 'fui-CarouselNavImageButton',
  // TODO: add class names for all slots on CarouselNavImageButtonSlots.
  // Should be of the form `<slotName>: 'fui-CarouselNavImageButton__<slotName>`
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
 * Apply styling to the CarouselNavImageButton slots based on the state
 */
export const useCarouselNavImageButtonStyles_unstable = (
  state: CarouselNavImageButtonState,
): CarouselNavImageButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(carouselNavImageButtonClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
