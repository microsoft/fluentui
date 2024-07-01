import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDividerSlots, NavDividerState } from './NavDivider.types';

export const navDividerClassNames: SlotClassNames<NavDividerSlots> = {
  root: 'fui-NavDivider',
  // TODO: add class names for all slots on NavDividerSlots.
  // Should be of the form `<slotName>: 'fui-NavDivider__<slotName>`
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
 * Apply styling to the NavDivider slots based on the state
 */
export const useNavDividerStyles_unstable = (state: NavDividerState): NavDividerState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(navDividerClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
