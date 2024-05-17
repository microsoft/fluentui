import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSectionHeaderSlots, NavSectionHeaderState } from './NavSectionHeader.types';

export const navSectionHeaderClassNames: SlotClassNames<NavSectionHeaderSlots> = {
  root: 'fui-NavSectionHeader',
  // TODO: add class names for all slots on NavSectionHeaderSlots.
  // Should be of the form `<slotName>: 'fui-NavSectionHeader__<slotName>`
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
 * Apply styling to the NavSectionHeader slots based on the state
 */
export const useNavSectionHeaderStyles_unstable = (state: NavSectionHeaderState): NavSectionHeaderState => {
  const styles = useStyles();
  state.root.className = mergeClasses(navSectionHeaderClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
