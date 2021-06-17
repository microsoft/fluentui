import { createContext } from '@fluentui/react-bindings';

export type ChatContextValue = {
  compact: boolean;
};

export const ChatContext = createContext<ChatContextValue>({ compact: false });

export const ChatContextProvider = ChatContext.Provider;
