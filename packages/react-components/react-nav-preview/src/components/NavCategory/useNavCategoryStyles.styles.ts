import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavCategorySlots, NavCategoryState } from './NavCategory.types';

export const navCategoryClassNames: SlotClassNames<NavCategorySlots> = {
  root: 'fui-NavCategory',
  // TODO: add class names for all slots on NavCategorySlots.
  // Should be of the form `<slotName>: 'fui-NavCategory__<slotName>`
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
 * Apply styling to the NavCategory slots based on the state
 */
export const useNavCategoryStyles_unstable = (state: NavCategoryState): NavCategoryState => {
  const styles = useStyles();
  state.root.className = mergeClasses(navCategoryClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
