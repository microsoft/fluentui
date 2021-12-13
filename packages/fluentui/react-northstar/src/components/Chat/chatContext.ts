import { createContext } from '@fluentui/react-bindings';
import { Accessibility } from '@fluentui/accessibility';

export type ChatDensity = 'comfy' | 'compact';
export const defaultChatDensity: ChatDensity = 'comfy';

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

export const ChatContext = createContext<ChatContextValue>({
  density: defaultChatDensity,
  behaviors: {
    item: undefined,
    message: undefined,
  },
});
export const ChatContextProvider = ChatContext.Provider;
