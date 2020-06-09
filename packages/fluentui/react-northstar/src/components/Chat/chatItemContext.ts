import { createContext } from '@fluentui/react-context-selector';

export type ChatItemContextValue = {
  attached: boolean | 'top' | 'bottom';
};

export const ChatItemContext = createContext<ChatItemContextValue>({ attached: false }, { strict: false });

export const ChatItemContextProvider = ChatItemContext.Provider;
