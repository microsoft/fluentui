import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerHeaderNavSlots, NavDrawerHeaderNavState } from './NavDrawerHeaderNav.types';

export const navDrawerHeaderNavClassNames: SlotClassNames<NavDrawerHeaderNavSlots> = {
  root: 'fui-NavDrawerHeaderNav',
  // TODO: add class names for all slots on NavDrawerHeaderNavSlots.
  // Should be of the form `<slotName>: 'fui-NavDrawerHeaderNav__<slotName>`
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
 * Apply styling to the NavDrawerHeaderNav slots based on the state
 */
export const useNavDrawerHeaderNavStyles_unstable = (state: NavDrawerHeaderNavState): NavDrawerHeaderNavState => {
  const styles = useStyles();
  state.root.className = mergeClasses(navDrawerHeaderNavClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
