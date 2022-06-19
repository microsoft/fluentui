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
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
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
