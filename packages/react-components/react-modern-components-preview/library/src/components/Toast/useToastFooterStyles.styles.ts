import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToastFooterSlots, ToastFooterState } from './ToastFooter.types';
import styles from './ToastFooter.module.css';

export const toastFooterClassNames: SlotClassNames<ToastFooterSlots> = {
  root: 'fui-ToastFooter',
};

/** Apply styling to the ToastFooter slots. */
export const useToastFooterStyles = (state: ToastFooterState): ToastFooterState => {
  state.root.className = clsx(toastFooterClassNames.root, styles.root, state.root.className);
  return state;
};
