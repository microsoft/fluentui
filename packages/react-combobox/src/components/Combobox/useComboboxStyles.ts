import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { ComboboxSlots, ComboboxState } from './Combobox.types';

/**
 * @deprecated Use `comboboxClassNames.root` instead.
 */
export const comboboxClassName = 'fui-Combobox';
export const comboboxClassNames: SlotClassNames<ComboboxSlots> = {
  root: 'fui-Combobox',
  listbox: 'fui-Combobox__listbox',
  trigger: 'fui-Combobox__trigger',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
});

/**
 * Apply styling to the Combobox slots based on the state
 */
export const useComboboxStyles_unstable = (state: ComboboxState): ComboboxState => {
  const styles = useStyles();
  state.root.className = mergeClasses(comboboxClassNames.root, styles.root, state.root.className);

  return state;
};
