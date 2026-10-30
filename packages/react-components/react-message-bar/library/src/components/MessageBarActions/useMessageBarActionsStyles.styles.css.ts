import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarActionsSlots, MessageBarActionsState } from './MessageBarActions.types';
import styles from './MessageBarActions.module.css';

export const messageBarActionsClassNames: SlotClassNames<MessageBarActionsSlots> = {
  root: 'fui-MessageBarActions',
  containerAction: 'fui-MessageBarActions__containerAction',
};

/**
 * Apply styling to the MessageBarActions slots based on the state
 */
export const useMessageBarActionsStyles_unstable = (state: MessageBarActionsState): MessageBarActionsState => {
  state.root.className = clsx(
    messageBarActionsClassNames.root,
    styles.root,
    styles[state.layout],
    !state.hasActions && styles.noActions,
    state.root.className,
  );
  if (state.containerAction) {
    state.containerAction.className = clsx(
      messageBarActionsClassNames.containerAction,
      styles.containerAction,
      state.containerAction.className,
    );
  }
  return state;
};
