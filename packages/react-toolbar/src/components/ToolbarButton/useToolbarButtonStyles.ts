import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { ToolbarButtonSlots, ToolbarButtonState } from './ToolbarButton.types';

export const toolbarButtonClassNames: SlotClassNames<ToolbarButtonSlots> = {
  root: 'fui-ToolbarButton',
};

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
  state.root.className = mergeClasses(toolbarButtonClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
