import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToastContainerSlots, ToastContainerState } from './ToastContainer.types';
import styles from './ToastContainer.module.css';

export const toastContainerClassNames: SlotClassNames<ToastContainerSlots> = {
  root: 'fui-ToastContainer',
  timer: 'fui-ToastContainer__timer',
};

export const useToastContainerStyles_unstable = (state: ToastContainerState): ToastContainerState => {
  state.root.className = clsx(toastContainerClassNames.root, styles.root, state.root.className);
  return state;
};
