import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSlots, NavState } from './Nav.types';

export const navClassNames: SlotClassNames<NavSlots> = {
  root: 'fui-Nav',
  // TODO: add class names for all slots on NavSlots.
  // Should be of the form `<slotName>: 'fui-Nav__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the Nav slots based on the state
 */
export const useNavStyles_unstable = (state: NavState): NavState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(navClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
