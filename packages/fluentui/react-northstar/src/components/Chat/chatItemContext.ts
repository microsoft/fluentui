import { createContext } from '@fluentui/react-bindings';

export type ChatItemContextValue = {
  attached: boolean | 'top' | 'bottom';
  compact: boolean;
};

export const ChatItemContext = createContext<ChatItemContextValue>({ attached: false, compact: false });

export const ChatItemContextProvider = ChatItemContext.Provider;
