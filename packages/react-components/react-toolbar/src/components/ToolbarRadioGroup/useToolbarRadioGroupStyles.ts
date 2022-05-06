import { makeStyles, mergeClasses } from '@griffel/react';
import type { ToolbarRadioGroupSlots, ToolbarRadioGroupState } from './ToolbarRadioGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const toolbarRadioGroupClassName = 'fui-ToolbarRadioGroup';
export const toolbarRadioGroupClassNames: SlotClassNames<ToolbarRadioGroupSlots> = {
  root: 'fui-ToolbarRadioGroup',
  // TODO: add class names for all slots on ToolbarRadioGroupSlots.
  // Should be of the form `<slotName>: 'fui-ToolbarRadioGroup__<slotName>`
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
 * Apply styling to the ToolbarRadioGroup slots based on the state
 */
export const useToolbarRadioGroupStyles_unstable = (state: ToolbarRadioGroupState): ToolbarRadioGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(toolbarRadioGroupClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
