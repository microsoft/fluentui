import { makeStyles, mergeClasses } from '@griffel/react';
import type { DialogActionsSlots, DialogActionsState } from './DialogActions.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const dialogActionsClassName = 'fui-DialogActions';
export const dialogActionsClassNames: SlotClassNames<DialogActionsSlots> = {
  root: 'fui-DialogActions',
  // TODO: add class names for all slots on DialogActionsSlots.
  // Should be of the form `<slotName>: 'fui-DialogActions__<slotName>`
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
 * Apply styling to the DialogActions slots based on the state
 */
export const useDialogActionsStyles_unstable = (state: DialogActionsState): DialogActionsState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogActionsClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
