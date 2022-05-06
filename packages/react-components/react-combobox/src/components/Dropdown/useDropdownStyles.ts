import { makeStyles, mergeClasses } from '@griffel/react';
import type { DropdownSlots, DropdownState } from './Dropdown.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const dropdownClassNames: SlotClassNames<DropdownSlots> = {
  root: 'fui-Dropdown',
  listbox: 'fui-Dropdown__listbox',
  input: 'fui-Dropdown__input',
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
  state.root.className = mergeClasses(dropdownClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
