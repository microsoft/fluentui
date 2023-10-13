import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavLinkSlots, NavLinkState } from './NavLink.types';

export const navLinkClassNames: SlotClassNames<NavLinkSlots> = {
  root: 'fui-NavLink',
  // TODO: add class names for all slots on NavLinkSlots.
  // Should be of the form `<slotName>: 'fui-NavLink__<slotName>`
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
 * Apply styling to the NavLink slots based on the state
 */
export const useNavLinkStyles_unstable = (state: NavLinkState): NavLinkState => {
  const styles = useStyles();
  state.root.className = mergeClasses(navLinkClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
