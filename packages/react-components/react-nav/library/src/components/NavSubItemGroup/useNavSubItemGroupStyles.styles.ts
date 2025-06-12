import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSubItemGroupSlots, NavSubItemGroupState } from './NavSubItemGroup.types';

export const navSubItemGroupClassNames: SlotClassNames<NavSubItemGroupSlots> = {
  root: 'fui-NavSubItemGroup',
  // TODO: add class names for all slots on NavSubItemGroupSlots.
  // Should be of the form `<slotName>: 'fui-NavSubItemGroup__<slotName>`
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
 * Apply styling to the NavSubItemGroup slots based on the state
 */
export const useNavSubItemGroupStyles_unstable = (state: NavSubItemGroupState): NavSubItemGroupState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(navSubItemGroupClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
