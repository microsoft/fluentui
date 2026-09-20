import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarBodySlots, MessageBarBodyState } from './MessageBarBody.types';
import styles from './MessageBarBody.module.css';

export const messageBarBodyClassNames: SlotClassNames<MessageBarBodySlots> = {
  root: 'fui-MessageBarBody',
};

export const useMessageBarBodyStyles = (state: MessageBarBodyState): MessageBarBodyState => {
  state.root.className = clsx(messageBarBodyClassNames.root, styles.root, state.root.className);
  return state;
};
