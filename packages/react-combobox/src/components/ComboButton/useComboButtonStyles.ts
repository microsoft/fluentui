import { makeStyles, mergeClasses } from '@griffel/react';
import type { ComboButtonState } from './ComboButton.types';

export const comboButtonClassName = 'fui-ComboButton';

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
 * Apply styling to the ComboButton slots based on the state
 */
export const useComboButtonStyles_unstable = (state: ComboButtonState): ComboButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(comboButtonClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
