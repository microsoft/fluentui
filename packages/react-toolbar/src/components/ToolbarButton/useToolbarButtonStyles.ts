import { makeStyles, mergeClasses } from '@griffel/react';
import type { ToolbarButtonState } from './ToolbarButton.types';

export const toolbarButtonClassName = 'fui-ToolbarButton';
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
 * Apply styling to the ToolbarButton slots based on the state
 */
export const useToolbarButtonStyles_unstable = (state: ToolbarButtonState): ToolbarButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(toolbarButtonClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
