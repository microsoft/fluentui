import { ContextSelector, createContext, useContextSelectors } from '@fluentui/react-bindings';
import { Accessibility } from '@fluentui/accessibility';
import { ChatDensity, defaultChatDensity } from './chatDensity';

export type ChatContextValue = {
  density: ChatDensity;

  behaviors: {
    item: Accessibility;
    message: Accessibility;
  };
};

export type ChatContextSubscribedValue = {
  density: ChatDensity;
  accessibility: Accessibility;
};
type ChatSelectorProperties = keyof ChatContextSubscribedValue;

const ChatContext = createContext<ChatContextValue>({
  density: defaultChatDensity,
  behaviors: {
    item: undefined,
    message: undefined,
  },
});
export const ChatContextProvider = ChatContext.Provider;

export const useChatContextSelectors = <
  Selectors extends Record<ChatSelectorProperties, ContextSelector<ChatContextValue, any>>,
>(
  selectors: Selectors,
): Record<ChatSelectorProperties, any> =>
  useContextSelectors(ChatContext, selectors) as unknown as ChatContextSubscribedValue;
