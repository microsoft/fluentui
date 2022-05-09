import { makeStyles, mergeClasses } from '@griffel/react';
import type { ComboboxBaseSlots, ComboboxBaseState } from './ComboboxBase.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const comboboxBaseClassNames: SlotClassNames<ComboboxBaseSlots> = {
  root: 'fui-ComboboxBase',
  listbox: 'fui-ComboboxBase__listbox',
  input: 'fui-ComboboxBase__input',
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
export const useComboboxBaseStyles_unstable = (state: ComboboxBaseState): ComboboxBaseState => {
  const styles = useStyles();
  state.root.className = mergeClasses(comboboxBaseClassNames.root, styles.root, state.root.className);
  state.listbox.className = mergeClasses(comboboxBaseClassNames.listbox, styles.listbox, state.listbox.className);
  state.input.className = mergeClasses(comboboxBaseClassNames.input, styles.input, state.input.className);

  return state;
};
