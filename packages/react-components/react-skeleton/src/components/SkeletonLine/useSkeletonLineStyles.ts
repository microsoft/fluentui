import { makeStyles, mergeClasses } from '@griffel/react';
import type { SkeletonLineSlots, SkeletonLineState } from './SkeletonLine.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const skeletonLineClassNames: SlotClassNames<SkeletonLineSlots> = {
  root: 'fui-SkeletonLine',
  // TODO: add class names for all slots on SkeletonLineSlots.
  // Should be of the form `<slotName>: 'fui-SkeletonLine__<slotName>`
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
 * Apply styling to the SkeletonLine slots based on the state
 */
export const useSkeletonLineStyles_unstable = (state: SkeletonLineState): SkeletonLineState => {
  const styles = useStyles();
  state.root.className = mergeClasses(skeletonLineClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
