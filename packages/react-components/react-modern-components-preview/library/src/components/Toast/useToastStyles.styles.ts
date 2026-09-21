import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToastSlots, ToastState } from './Toast.types';
import * as styles from './Toast.module.css';

export const toastClassNames: SlotClassNames<ToastSlots> = {
  root: 'fui-Toast',
};

/** Apply styling to the Toast slots. */
export const useToastStyles = (state: ToastState): ToastState => {
  state.root.className = clsx(toastClassNames.root, styles.root, state.root.className);
  return state;
};
