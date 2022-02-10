import { makeStyles, mergeClasses } from '@griffel/react';
import type { ComboboxState } from './Combobox.types';

export const comboboxClassName = 'fui-Combobox';

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
  state.root.className = mergeClasses(comboboxClassName, styles.root, state.root.className);

  return state;
};
