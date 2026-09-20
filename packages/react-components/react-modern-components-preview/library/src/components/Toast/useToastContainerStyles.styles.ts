import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToastContainerSlots, ToastContainerState } from './ToastContainer.types';
import styles from './ToastContainer.module.css';

export const toastContainerClassNames: SlotClassNames<ToastContainerSlots> = {
  root: 'fui-ToastContainer',
};

/** Apply styling to the ToastContainer slots. */
export const useToastContainerStyles = (state: ToastContainerState): ToastContainerState => {
  state.root.className = clsx(toastContainerClassNames.root, styles.root, state.root.className);
  return state;
};
