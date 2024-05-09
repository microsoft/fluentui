import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerHeaderSlots, NavDrawerHeaderState } from './NavDrawerHeader.types';

export const navDrawerHeaderClassNames: SlotClassNames<NavDrawerHeaderSlots> = {
  root: 'fui-NavDrawerHeader',
  // TODO: add class names for all slots on NavDrawerHeaderSlots.
  // Should be of the form `<slotName>: 'fui-NavDrawerHeader__<slotName>`
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
 * Apply styling to the NavDrawerHeader slots based on the state
 */
export const useNavDrawerHeaderStyles_unstable = (state: NavDrawerHeaderState): NavDrawerHeaderState => {
  const styles = useStyles();
  state.root.className = mergeClasses(navDrawerHeaderClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
