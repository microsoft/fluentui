import * as React from 'react';
import { useChatMessageLegacy_unstable } from './useChatMessageLegacy';
import { renderChatMessageLegacy_unstable } from './renderChatMessageLegacy';
import { useChatMessageLegacyStyles_unstable } from './useChatMessageLegacyStyles';
import type { ChatMessageLegacyProps } from './ChatMessageLegacy.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ChatMessageLegacy component - TODO: add more docs
 */
export const ChatMessageLegacy: ForwardRefComponent<ChatMessageLegacyProps> = React.forwardRef((props, ref) => {
  const state = useChatMessageLegacy_unstable(props, ref);

  useChatMessageLegacyStyles_unstable(state);
  return renderChatMessageLegacy_unstable(state);
});

ChatMessageLegacy.displayName = 'ChatMessageLegacy';
