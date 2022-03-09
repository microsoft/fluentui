import { makeStyles, mergeClasses } from '@griffel/react';
import type { ToolbarDividerState } from './ToolbarDivider.types';

export const toolbarDividerClassName = 'fui-ToolbarDivider';
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
 * Apply styling to the ToolbarDivider slots based on the state
 */
export const useToolbarDividerStyles_unstable = (state: ToolbarDividerState): ToolbarDividerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(toolbarDividerClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
