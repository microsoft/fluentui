import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SplitNavItemSlots, SplitNavItemState } from './SplitNavItem.types';

export const splitNavItemClassNames: SlotClassNames<SplitNavItemSlots> = {
  root: 'fui-SplitNavItem',
  primaryNavItem: 'fui-SplitNavItem_primaryNavItem',
  menuButton: 'fui-SplitNavItem_menuButton',
  secondaryActionButton: 'fui-SplitNavItem_secondaryActionButton',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
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

  if (state.primaryNavItem) {
    state.primaryNavItem.className = mergeClasses(splitNavItemClassNames.primaryNavItem);
  }

  if (state.secondaryActionButton) {
    state.secondaryActionButton.className = mergeClasses(splitNavItemClassNames.secondaryActionButton);
  }

  if (state.menuButton) {
    state.menuButton.className = mergeClasses(splitNavItemClassNames.menuButton);
  }

  return state;
};
