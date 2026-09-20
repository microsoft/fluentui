import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToastTitleSlots, ToastTitleState } from './ToastTitle.types';
import styles from './ToastTitle.module.css';

export const toastTitleClassNames: SlotClassNames<ToastTitleSlots> = {
  root: 'fui-ToastTitle',
  media: 'fui-ToastTitle__media',
  action: 'fui-ToastTitle__action',
};

/** Apply styling to the ToastTitle slots. */
export const useToastTitleStyles = (state: ToastTitleState): ToastTitleState => {
  state.root.className = clsx(toastTitleClassNames.root, styles.root, state.root.className);
  if (state.media) {
    state.media.className = clsx(toastTitleClassNames.media, styles.media, state.media.className);
  }
  if (state.action) {
    state.action.className = clsx(toastTitleClassNames.action, styles.action, state.action.className);
  }
  return state;
};
