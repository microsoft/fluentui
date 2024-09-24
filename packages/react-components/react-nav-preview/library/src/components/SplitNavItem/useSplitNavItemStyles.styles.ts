import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SplitNavItemSlots, SplitNavItemState } from './SplitNavItem.types';

export const splitNavItemClassNames: SlotClassNames<SplitNavItemSlots> = {
  root: 'fui-SplitNavItem',
  secondaryActionButton: 'fui-SplitNavItem-secondaryActionButton',
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
 * Apply styling to the SplitNavItem slots based on the state
 */
export const useSplitNavItemStyles_unstable = (state: SplitNavItemState): SplitNavItemState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(splitNavItemClassNames.root, styles.root, state.root.className);

  if (state.secondaryActionButton) {
    state.secondaryActionButton.className = mergeClasses(splitNavItemClassNames.secondaryActionButton);
  }

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
