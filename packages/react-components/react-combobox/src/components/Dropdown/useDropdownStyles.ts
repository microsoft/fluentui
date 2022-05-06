import { makeStyles, mergeClasses } from '@griffel/react';
import type { DropdownSlots, DropdownState } from './Dropdown.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const dropdownClassName = 'fui-Dropdown';
export const dropdownClassNames: SlotClassNames<DropdownSlots> = {
  root: 'fui-Dropdown',
  // TODO: add class names for all slots on DropdownSlots.
  // Should be of the form `<slotName>: 'fui-Dropdown__<slotName>`
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
 * Apply styling to the Dropdown slots based on the state
 */
export const useDropdownStyles_unstable = (state: DropdownState): DropdownState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dropdownClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
