import { makeStyles, mergeClasses } from '@griffel/react';
import type { DrawerSlots, DrawerState } from './Drawer.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const drawerClassNames: SlotClassNames<DrawerSlots> = {
  root: 'fui-Drawer',
  // TODO: add class names for all slots on DrawerSlots.
  // Should be of the form `<slotName>: 'fui-Drawer__<slotName>`
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
 * Apply styling to the Drawer slots based on the state
 */
export const useDrawerStyles_unstable = (state: DrawerState): DrawerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(drawerClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
