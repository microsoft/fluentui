import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarSlots, MessageBarState } from './MessageBar.types';
import styles from './MessageBar.module.css';

export const messageBarClassNames: SlotClassNames<MessageBarSlots> = {
  root: 'fui-MessageBar',
  icon: 'fui-MessageBar__icon',
  bottomReflowSpacer: 'fui-MessageBar__bottomReflowSpacer',
};

/** Apply styling to the MessageBar slots. */
export const useMessageBarStyles = (state: MessageBarState): MessageBarState => {
  state.root.className = clsx(messageBarClassNames.root, styles.root, state.root.className);
  if (state.icon) {
    state.icon.className = clsx(messageBarClassNames.icon, styles.icon, state.icon.className);
  }
  if (state.bottomReflowSpacer) {
    state.bottomReflowSpacer.className = clsx(
      messageBarClassNames.bottomReflowSpacer,
      styles.bottomReflowSpacer,
      state.bottomReflowSpacer.className,
    );
  }
  return state;
};
