import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { HamburgerInNavSlots, HamburgerInNavState } from './HamburgerInNav.types';

export const hamburgerInNavClassNames: SlotClassNames<HamburgerInNavSlots> = {
  root: 'fui-HamburgerInNav',
  // TODO: add class names for all slots on HamburgerInNavSlots.
  // Should be of the form `<slotName>: 'fui-HamburgerInNav__<slotName>`
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
 * Apply styling to the HamburgerInNav slots based on the state
 */
export const useHamburgerInNavStyles_unstable = (state: HamburgerInNavState): HamburgerInNavState => {
  const styles = useStyles();
  state.root.className = mergeClasses(hamburgerInNavClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
