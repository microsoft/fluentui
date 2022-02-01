import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { ComboboxState } from './Combobox.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
});

/**
 * Apply styling to the Combobox slots based on the state
 */
export const useComboboxStyles = (state: ComboboxState): ComboboxState => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
