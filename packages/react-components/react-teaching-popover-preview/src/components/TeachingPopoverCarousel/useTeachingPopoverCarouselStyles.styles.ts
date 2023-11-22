import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselSlots, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';

export const teachingPopoverCarouselClassNames: SlotClassNames<TeachingPopoverCarouselSlots> = {
  root: 'fui-TeachingPopoverCarousel',
  // TODO: add class names for all slots on TeachingPopoverCarouselSlots.
  // Should be of the form `<slotName>: 'fui-TeachingPopoverCarousel__<slotName>`
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
 * Apply styling to the TeachingPopoverCarousel slots based on the state
 */
export const useTeachingPopoverCarouselStyles_unstable = (
  state: TeachingPopoverCarouselState,
): TeachingPopoverCarouselState => {
  const styles = useStyles();
  state.root.className = mergeClasses(teachingPopoverCarouselClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
