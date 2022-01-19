import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { DialogState } from './Dialog.types';

export const dialogClassName = 'fui-Dialog';

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
 * Apply styling to the Dialog slots based on the state
 */
export const useDialogStyles = (state: DialogState): DialogState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
