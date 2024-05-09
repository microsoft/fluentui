import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { HamburgerSlots, HamburgerState } from './Hamburger.types';

export const hamburgerClassNames: SlotClassNames<HamburgerSlots> = {
  root: 'fui-Hamburger',
  // TODO: add class names for all slots on HamburgerSlots.
  // Should be of the form `<slotName>: 'fui-Hamburger__<slotName>`
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
 * Apply styling to the Hamburger slots based on the state
 */
export const useHamburgerStyles_unstable = (state: HamburgerState): HamburgerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(hamburgerClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
