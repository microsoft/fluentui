import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { DialogSlots, DialogState } from './Dialog.types';

export const dialogClassNames: SlotClassNames<DialogSlots> = {
  root: 'fui-Dialog',
  overlay: 'fui-Dialog__overlay',
};
/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
  overlay: {},
});

/**
 * Apply styling to the Dialog slots based on the state
 */
export const useDialogStyles_unstable = (state: DialogState): DialogState => {
  const styles = useStyles();

  state.root.className = mergeClasses(dialogClassNames.root, styles.root, state.root.className);

  if (state.overlay) {
    state.overlay.className = mergeClasses(dialogClassNames.overlay, styles.overlay, state.overlay.className);
  }

  return state;
};
