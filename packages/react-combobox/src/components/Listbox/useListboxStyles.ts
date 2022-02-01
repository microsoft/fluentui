import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { ListboxState } from './Listbox.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    boxShadow: '0px 0px 2px 0px #0000001F, 0px 8px 16px 0px #00000024',
    borderRadius: '4px',
    backgroundColor: '#fff',
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the Listbox slots based on the state
 */
export const useListboxStyles = (state: ListboxState): ListboxState => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
