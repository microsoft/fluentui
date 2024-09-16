import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselAnnouncerSlots, CarouselAnnouncerState } from './CarouselAnnouncer.types';

export const carouselAnnouncerClassNames: SlotClassNames<CarouselAnnouncerSlots> = {
  root: 'fui-CarouselAnnouncer',
  // TODO: add class names for all slots on CarouselAnnouncerSlots.
  // Should be of the form `<slotName>: 'fui-CarouselAnnouncer__<slotName>`
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
 * Apply styling to the CarouselAnnouncer slots based on the state
 */
export const useCarouselAnnouncerStyles_unstable = (state: CarouselAnnouncerState): CarouselAnnouncerState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(carouselAnnouncerClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
