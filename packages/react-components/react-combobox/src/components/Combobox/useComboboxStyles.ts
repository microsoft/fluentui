import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { ComboboxSlots, ComboboxState } from './Combobox.types';

export const comboboxClassNames: SlotClassNames<ComboboxSlots> = {
  root: 'fui-Combobox',
  listbox: 'fui-Combobox__listbox',
  input: 'fui-Combobox__input',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
  listbox: {},
  input: {},
});

/**
 * Apply styling to the Combobox slots based on the state
 */
export const useComboboxStyles_unstable = (state: ComboboxState): ComboboxState => {
  const styles = useStyles();
  state.root.className = mergeClasses(comboboxClassNames.root, styles.root, state.root.className);
  state.listbox.className = mergeClasses(comboboxClassNames.listbox, styles.listbox, state.listbox.className);
  state.input.className = mergeClasses(comboboxClassNames.input, styles.input, state.input.className);

  return state;
};
