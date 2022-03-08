import { makeStyles, mergeClasses } from '@griffel/react';
import type { DialogHeaderState } from './DialogHeader.types';

export const dialogHeaderClassName = 'fui-DialogHeader';
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
 * Apply styling to the DialogHeader slots based on the state
 */
export const useDialogHeaderStyles_unstable = (state: DialogHeaderState): DialogHeaderState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogHeaderClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
