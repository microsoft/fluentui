import { makeStyles, mergeClasses } from '@griffel/react';
import type { SpinButtonState } from './SpinButton.types';

export const spinButtonClassName = 'fui-SpinButton';

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
 * Apply styling to the SpinButton slots based on the state
 */
export const useSpinButtonStyles_unstable = (state: SpinButtonState): SpinButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(spinButtonClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
