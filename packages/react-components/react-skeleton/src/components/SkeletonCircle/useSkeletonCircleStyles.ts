import { makeStyles, mergeClasses } from '@griffel/react';
import type { SkeletonCircleSlots, SkeletonCircleState } from './SkeletonCircle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const skeletonCircleClassNames: SlotClassNames<SkeletonCircleSlots> = {
  root: 'fui-SkeletonCircle',
  // TODO: add class names for all slots on SkeletonCircleSlots.
  // Should be of the form `<slotName>: 'fui-SkeletonCircle__<slotName>`
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
 * Apply styling to the SkeletonCircle slots based on the state
 */
export const useSkeletonCircleStyles_unstable = (state: SkeletonCircleState): SkeletonCircleState => {
  const styles = useStyles();
  state.root.className = mergeClasses(skeletonCircleClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
