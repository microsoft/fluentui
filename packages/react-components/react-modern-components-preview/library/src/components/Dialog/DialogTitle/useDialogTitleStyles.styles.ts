import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DialogTitleSlots, DialogTitleState } from './DialogTitle.types';
import styles from '../Dialog/Dialog.module.css';

export const dialogTitleClassNames: SlotClassNames<DialogTitleSlots> = {
  root: 'fui-DialogTitle',
};

/**
 * Apply styling to the DialogTitle slots based on the state.
 */
export const useDialogTitleStyles = (state: DialogTitleState): DialogTitleState => {
  state.root.className = clsx(dialogTitleClassNames.root, styles.title, state.root.className);

  return state;
};
