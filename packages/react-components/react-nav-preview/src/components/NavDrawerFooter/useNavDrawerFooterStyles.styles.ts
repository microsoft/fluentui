import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerFooterSlots, NavDrawerFooterState } from './NavDrawerFooter.types';

export const navDrawerFooterClassNames: SlotClassNames<NavDrawerFooterSlots> = {
  root: 'fui-NavDrawerFooter',
  // TODO: add class names for all slots on NavDrawerFooterSlots.
  // Should be of the form `<slotName>: 'fui-NavDrawerFooter__<slotName>`
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
 * Apply styling to the NavDrawerFooter slots based on the state
 */
export const useNavDrawerFooterStyles_unstable = (state: NavDrawerFooterState): NavDrawerFooterState => {
  const styles = useStyles();
  state.root.className = mergeClasses(navDrawerFooterClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
