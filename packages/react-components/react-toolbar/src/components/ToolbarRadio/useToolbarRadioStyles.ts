import { makeStyles, mergeClasses } from '@griffel/react';
import type { ToolbarRadioSlots, ToolbarRadioState } from './ToolbarRadio.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const toolbarRadioClassName = 'fui-ToolbarRadio';
export const toolbarRadioClassNames: SlotClassNames<ToolbarRadioSlots> = {
  root: 'fui-ToolbarRadio',
  // TODO: add class names for all slots on ToolbarRadioSlots.
  // Should be of the form `<slotName>: 'fui-ToolbarRadio__<slotName>`
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
 * Apply styling to the ToolbarRadio slots based on the state
 */
export const useToolbarRadioStyles_unstable = (state: ToolbarRadioState): ToolbarRadioState => {
  const styles = useStyles();
  state.root.className = mergeClasses(toolbarRadioClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
