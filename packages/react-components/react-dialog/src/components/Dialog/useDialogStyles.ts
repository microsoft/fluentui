import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { useHasParentContext } from '@fluentui/react-context-selector';
import { DialogContext } from '../../contexts/dialogContext';
import type { DialogSlots, DialogState } from './Dialog.types';

export const dialogClassNames: SlotClassNames<DialogSlots> = {
  overlay: 'fui-Dialog__overlay',
};
/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  overlay: {
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    ...shorthands.inset('0px'),
  },
  nestedDialogOverlay: {
    backgroundColor: 'transparent',
  },
});

/**
 * Apply styling to the Dialog slots based on the state
 */
export const useDialogStyles_unstable = (state: DialogState): DialogState => {
  const styles = useStyles();
  const isNestedDialog = useHasParentContext(DialogContext);

  if (state.overlay) {
    state.overlay.className = mergeClasses(
      dialogClassNames.overlay,
      styles.overlay,
      isNestedDialog && styles.nestedDialogOverlay,
      state.overlay.className,
    );
  }

  return state;
};
