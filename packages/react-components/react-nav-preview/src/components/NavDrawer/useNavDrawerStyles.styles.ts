import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerState } from './NavDrawer.types';
import { InlineDrawerSlots } from '../../../../react-drawer/src/InlineDrawer';

export const navDrawerClassNames: SlotClassNames<InlineDrawerSlots> = {
  root: 'fui-NavDrawer',
  // TODO: add class names for all slots on NavDrawerSlots.
  // Should be of the form `<slotName>: 'fui-NavDrawer__<slotName>`
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
 * Apply styling to the NavDrawer slots based on the state
 */
export const useNavDrawerStyles_unstable = (state: NavDrawerState): NavDrawerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(navDrawerClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
