import { makeStyles, mergeClasses } from '@griffel/react';
import type { DialogContentSlots, DialogContentState } from './DialogContent.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const dialogContentClassNames: SlotClassNames<DialogContentSlots> = {
  root: 'fui-DialogContent',
  // TODO: add class names for all slots on DialogContentSlots.
  // Should be of the form `<slotName>: 'fui-DialogContent__<slotName>`
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
 * Apply styling to the DialogContent slots based on the state
 */
export const useDialogContentStyles_unstable = (state: DialogContentState): DialogContentState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogContentClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
