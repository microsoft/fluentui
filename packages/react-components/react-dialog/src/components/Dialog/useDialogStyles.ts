import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { DialogSlots, DialogState } from './Dialog.types';

/**
 * @deprecated Use `dialogClassNames.root` instead.
 */
export const dialogClassName = 'fui-Dialog';
export const dialogClassNames: SlotClassNames<DialogSlots> = {
  root: 'fui-Dialog',
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
 * Apply styling to the Dialog slots based on the state
 */
export const useDialogStyles_unstable = (state: DialogState): DialogState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
