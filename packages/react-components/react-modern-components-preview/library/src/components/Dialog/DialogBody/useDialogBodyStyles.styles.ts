import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DialogBodySlots, DialogBodyState } from './DialogBody.types';
import styles from '../Dialog/Dialog.module.css';

export const dialogBodyClassNames: SlotClassNames<DialogBodySlots> = {
  root: 'fui-DialogBody',
};

/**
 * Apply styling to the DialogBody slots based on the state.
 */
export const useDialogBodyStyles = (state: DialogBodyState): DialogBodyState => {
  state.root.className = clsx(dialogBodyClassNames.root, styles.body, state.root.className);

  return state;
};
