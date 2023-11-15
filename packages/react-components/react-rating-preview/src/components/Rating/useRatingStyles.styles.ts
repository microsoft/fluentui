import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingSlots, RatingState } from './Rating.types';

export const ratingClassNames: SlotClassNames<RatingSlots> = {
  root: 'fui-Rating',
  // TODO: add class names for all slots on RatingSlots.
  // Should be of the form `<slotName>: 'fui-Rating__<slotName>`
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
 * Apply styling to the Rating slots based on the state
 */
export const useRatingStyles_unstable = (state: RatingState): RatingState => {
  const styles = useStyles();
  state.root.className = mergeClasses(ratingClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
