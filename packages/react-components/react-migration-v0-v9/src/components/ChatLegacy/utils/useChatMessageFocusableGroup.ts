import { useFocusableGroup } from '@fluentui/react-tabster';
import { ChatMessageLegacyState } from '../ChatMessageLegacy/ChatMessageLegacy.types';
import { ChatMyMessageLegacyState } from '../ChatMyMessageLegacy/ChatMyMessageLegacy.types';

export const useChatMessageFocusableGroup = (
  state: Pick<ChatMessageLegacyState | ChatMyMessageLegacyState, 'body'>,
) => {
  const groupperAttributes = useFocusableGroup({
    tabBehavior: 'limited-trap-focus',
  });

  (state.body as Record<string, string | undefined>)['data-tabster'] = groupperAttributes['data-tabster'];
};
