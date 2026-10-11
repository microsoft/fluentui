import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToastBodySlots, ToastBodyState } from './ToastBody.types';
import styles from './ToastBody.module.css';

export const toastBodyClassNames: SlotClassNames<ToastBodySlots> = {
  root: 'fui-ToastBody',
  subtitle: 'fui-ToastBody__subtitle',
};

/** Apply styling to the ToastBody slots. */
export const useToastBodyStyles = (state: ToastBodyState): ToastBodyState => {
  state.root.className = clsx(toastBodyClassNames.root, styles.root, state.root.className);
  if (state.subtitle) {
    state.subtitle.className = clsx(toastBodyClassNames.subtitle, styles.subtitle, state.subtitle.className);
  }
  return state;
};
