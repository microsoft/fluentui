import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DropdownSlots, DropdownState } from './Dropdown.types';

export const dropdownClassNames: SlotClassNames<DropdownSlots> = {
  root: 'fui-Dropdown',
  listbox: 'fui-Dropdown__listbox',
  button: 'fui-Dropdown__button',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
  listbox: {},
  button: {},
});

/**
 * Apply styling to the Combobox slots based on the state
 */
export const useDropdownStyles_unstable = (state: DropdownState): DropdownState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dropdownClassNames.root, styles.root, state.root.className);
  state.listbox.className = mergeClasses(dropdownClassNames.listbox, styles.listbox, state.listbox.className);
  state.button.className = mergeClasses(dropdownClassNames.button, styles.button, state.button.className);

  return state;
};
