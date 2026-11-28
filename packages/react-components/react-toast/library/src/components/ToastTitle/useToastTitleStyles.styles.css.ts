import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToastTitleSlots, ToastTitleState } from './ToastTitle.types';
import styles from './ToastTitle.module.css';

export const toastTitleClassNames: SlotClassNames<ToastTitleSlots> = {
  root: 'fui-ToastTitle',
  media: 'fui-ToastTitle__media',
  action: 'fui-ToastTitle__action',
};

export const useToastTitleStyles_unstable = (state: ToastTitleState): ToastTitleState => {
  state.root.className = clsx(
    toastTitleClassNames.root,
    styles.root,
    state.backgroundAppearance === 'inverted' && styles.inverted,
    state.root.className,
  );
  if (state.media) {
    state.media.className = clsx(
      toastTitleClassNames.media,
      styles.media,
      state.backgroundAppearance === 'inverted' && styles.inverted,
      state.intent && styles[state.intent],
      state.media.className,
    );
  }
  if (state.action) {
    state.action.className = clsx(
      toastTitleClassNames.action,
      styles.action,
      state.backgroundAppearance === 'inverted' && styles.inverted,
      state.action.className,
    );
  }
  return state;
};
