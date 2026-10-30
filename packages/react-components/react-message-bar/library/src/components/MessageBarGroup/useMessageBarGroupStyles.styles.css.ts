import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarGroupSlots, MessageBarGroupState } from './MessageBarGroup.types';

export const messageBarGroupClassNames: SlotClassNames<MessageBarGroupSlots> = {
  root: 'fui-MessageBarGroup',
};

/**
 * Apply styling to the MessageBarGroup slots based on the state
 */
export const useMessageBarGroupStyles_unstable = (state: MessageBarGroupState): MessageBarGroupState => {
  state.root.className = clsx(messageBarGroupClassNames.root, state.root.className);
  return state;
};
