import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarTitleSlots, MessageBarTitleState } from './MessageBarTitle.types';
import styles from './MessageBarTitle.module.css';

export const messageBarTitleClassNames: SlotClassNames<MessageBarTitleSlots> = {
  root: 'fui-MessageBarTitle',
};

export const useMessageBarTitleStyles = (state: MessageBarTitleState): MessageBarTitleState => {
  state.root.className = clsx(messageBarTitleClassNames.root, styles.root, state.root.className);
  return state;
};
