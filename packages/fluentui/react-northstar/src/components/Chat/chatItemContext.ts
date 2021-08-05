import { createContext } from '@fluentui/react-bindings';

export type ChatItemContextValue = {
  attached: boolean | 'top' | 'bottom';
};

export const ChatItemContext = createContext<ChatItemContextValue>({ attached: false });

export const ChatItemContextProvider = ChatItemContext.Provider;
