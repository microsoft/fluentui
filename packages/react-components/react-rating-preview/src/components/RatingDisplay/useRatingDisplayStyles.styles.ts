import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingDisplaySlots, RatingDisplayState } from './RatingDisplay.types';

export const ratingDisplayClassNames: SlotClassNames<RatingDisplaySlots> = {
  root: 'fui-RatingDisplay',
  // TODO: add class names for all slots on RatingDisplaySlots.
  // Should be of the form `<slotName>: 'fui-RatingDisplay__<slotName>`
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
 * Apply styling to the RatingDisplay slots based on the state
 */
export const useRatingDisplayStyles_unstable = (state: RatingDisplayState): RatingDisplayState => {
  const styles = useStyles();
  state.root.className = mergeClasses(ratingDisplayClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
