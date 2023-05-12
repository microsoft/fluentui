import * as React from 'react';

import type { ChatMyMessageLegacyProps } from './ChatMyMessageLegacy.types';
import { renderChatMyMessageLegacy_unstable } from './renderChatMyMessageLegacy';
import { useChatMyMessageLegacy_unstable } from './useChatMyMessageLegacy';
import { useChatMyMessageLegacyStyles_unstable } from './useChatMyMessageLegacyStyles';

/**
 * ChatMyMessageLegacy component - renders legacy layout of comfy chat message from myself
 */
export const ChatMyMessageLegacy = React.forwardRef<HTMLDivElement, ChatMyMessageLegacyProps>((props, ref) => {
  const state = useChatMyMessageLegacy_unstable(props, ref);
  useChatMyMessageLegacyStyles_unstable(state);
  return renderChatMyMessageLegacy_unstable(state);
});
ChatMyMessageLegacy.displayName = 'ChatMyMessageLegacy';
