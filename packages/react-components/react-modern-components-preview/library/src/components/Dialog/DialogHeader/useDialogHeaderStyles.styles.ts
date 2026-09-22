import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DialogHeaderSlots, DialogHeaderState } from './DialogHeader.types';
import styles from '../Dialog/Dialog.module.css';

export const dialogHeaderClassNames: SlotClassNames<DialogHeaderSlots> = {
  root: 'fui-DialogHeader',
};

/**
 * Apply styling to the DialogHeader slots based on the state.
 */
export const useDialogHeaderStyles = (state: DialogHeaderState): DialogHeaderState => {
  state.root.className = clsx(dialogHeaderClassNames.root, styles.header, state.root.className);

  return state;
};
