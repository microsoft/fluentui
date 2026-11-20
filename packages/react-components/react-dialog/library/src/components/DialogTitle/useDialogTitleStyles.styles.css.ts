import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DialogTitleState, DialogTitleSlots } from './DialogTitle.types';
import styles from './DialogTitle.module.css';

export const dialogTitleClassNames: SlotClassNames<DialogTitleSlots> = {
  root: 'fui-DialogTitle',
  action: 'fui-DialogTitle__action',
};

export const useDialogTitleInternalStyles = (): string => styles.internalAction;

export const useDialogTitleStyles_unstable = (state: DialogTitleState): DialogTitleState => {
  state.root.className = clsx(
    dialogTitleClassNames.root,
    styles.root,
    !state.action && styles.withoutAction,
    state.root.className,
  );
  if (state.action) {
    state.action.className = clsx(dialogTitleClassNames.action, styles.action, state.action.className);
  }
  return state;
};
