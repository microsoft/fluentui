import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DialogContentState, DialogContentSlots } from './DialogContent.types';
import styles from './DialogContent.module.css';

export const dialogContentClassNames: SlotClassNames<DialogContentSlots> = {
  root: 'fui-DialogContent',
};

export const useDialogContentStyles_unstable = (state: DialogContentState): DialogContentState => {
  state.root.className = clsx(dialogContentClassNames.root, styles.root, state.root.className);
  return state;
};
