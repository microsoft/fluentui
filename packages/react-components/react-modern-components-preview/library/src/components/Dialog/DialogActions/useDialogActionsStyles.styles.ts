import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DialogActionsSlots, DialogActionsState } from './DialogActions.types';
import styles from '../Dialog/Dialog.module.css';

export const dialogActionsClassNames: SlotClassNames<DialogActionsSlots> = {
  root: 'fui-DialogActions',
};

/**
 * Apply styling to the DialogActions slots based on the state.
 */
export const useDialogActionsStyles = (state: DialogActionsState): DialogActionsState => {
  state.root.className = clsx(dialogActionsClassNames.root, styles.actions, state.root.className);

  return state;
};
