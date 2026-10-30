import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DialogActionsState, DialogActionsSlots } from './DialogActions.types';
import styles from './DialogActions.module.css';

export const dialogActionsClassNames: SlotClassNames<DialogActionsSlots> = {
  root: 'fui-DialogActions',
};

export const useDialogActionsStyles_unstable = (state: DialogActionsState): DialogActionsState => {
  state.root.className = clsx(
    dialogActionsClassNames.root,
    styles.root,
    styles[state.position],
    state.fluid && styles.fluid,
    state.root.className,
  );
  return state;
};
