import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSubItemSlots, NavSubItemState } from './NavSubItem.types';

export const navSubItemClassNames: SlotClassNames<NavSubItemSlots> = {
  root: 'fui-NavSubItem',
  // TODO: add class names for all slots on NavSubItemSlots.
  // Should be of the form `<slotName>: 'fui-NavSubItem__<slotName>`
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
 * Apply styling to the NavSubItem slots based on the state
 */
export const useNavSubItemStyles_unstable = (state: NavSubItemState): NavSubItemState => {
  const styles = useStyles();
  state.root.className = mergeClasses(navSubItemClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
