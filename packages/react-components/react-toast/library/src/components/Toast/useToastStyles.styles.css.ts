import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToastSlots, ToastState } from './Toast.types';
import styles from './Toast.module.css';

export const toastClassNames: SlotClassNames<ToastSlots> = {
  root: 'fui-Toast',
};

export const useToastStyles_unstable = (state: ToastState): ToastState => {
  state.root.className = clsx(
    toastClassNames.root,
    styles.root,
    state.backgroundAppearance === 'inverted' && styles.inverted,
    state.root.className,
  );
  return state;
};
