import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarTitleSlots, MessageBarTitleState } from './MessageBarTitle.types';
import styles from './MessageBarTitle.module.css';

export const messageBarTitleClassNames: SlotClassNames<MessageBarTitleSlots> = {
  root: 'fui-MessageBarTitle',
};

/**
 * Apply styling to the MessageBarTitle slots based on the state
 */
export const useMessageBarTitleStyles_unstable = (state: MessageBarTitleState): MessageBarTitleState => {
  state.root.className = clsx(messageBarTitleClassNames.root, styles.root, state.root.className);

  return state;
};
