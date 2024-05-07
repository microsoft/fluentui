import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerBodySlots, NavDrawerBodyState } from './NavDrawerBody.types';

export const navDrawerBodyClassNames: SlotClassNames<NavDrawerBodySlots> = {
  root: 'fui-NavDrawerBody',
  // TODO: add class names for all slots on NavDrawerBodySlots.
  // Should be of the form `<slotName>: 'fui-NavDrawerBody__<slotName>`
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
 * Apply styling to the NavDrawerBody slots based on the state
 */
export const useNavDrawerBodyStyles_unstable = (state: NavDrawerBodyState): NavDrawerBodyState => {
  const styles = useStyles();
  state.root.className = mergeClasses(navDrawerBodyClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
