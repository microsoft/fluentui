import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselFooterSlots, CarouselFooterState } from './CarouselFooter.types';

export const carouselFooterClassNames: SlotClassNames<CarouselFooterSlots> = {
  root: 'fui-CarouselFooter',
  // TODO: add class names for all slots on CarouselFooterSlots.
  // Should be of the form `<slotName>: 'fui-CarouselFooter__<slotName>`
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
 * Apply styling to the CarouselFooter slots based on the state
 */
export const useCarouselFooterStyles_unstable = (state: CarouselFooterState): CarouselFooterState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(carouselFooterClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
