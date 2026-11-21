import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DialogBodyState, DialogBodySlots } from './DialogBody.types';
import styles from './DialogBody.module.css';

export const dialogBodyClassNames: SlotClassNames<DialogBodySlots> = {
  root: 'fui-DialogBody',
};

export const useDialogBodyStyles_unstable = (state: DialogBodyState): DialogBodyState => {
  state.root.className = clsx(dialogBodyClassNames.root, styles.root, state.root.className);
  return state;
};
