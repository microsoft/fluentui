import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavLinkGroupSlots, NavLinkGroupState } from './NavLinkGroup.types';

export const navLinkGroupClassNames: SlotClassNames<NavLinkGroupSlots> = {
  root: 'fui-NavLinkGroup',
  // TODO: add class names for all slots on NavLinkGroupSlots.
  // Should be of the form `<slotName>: 'fui-NavLinkGroup__<slotName>`
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
 * Apply styling to the NavLinkGroup slots based on the state
 */
export const useNavLinkGroupStyles_unstable = (state: NavLinkGroupState): NavLinkGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(navLinkGroupClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
