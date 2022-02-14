import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { ToolbarState } from './Toolbar.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    ...shorthands.gap('8px'),
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarStyles_unstable = (state: ToolbarState): ToolbarState => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
