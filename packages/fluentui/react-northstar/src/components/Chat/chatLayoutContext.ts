import { createContext, useContext } from 'react';

export type chatLayout = 'comfy' | 'compact';
export const defaultChatLayout: chatLayout = 'comfy';

const ChatLayoutContext = createContext<chatLayout>(defaultChatLayout);
export const ChatLayoutContextProvider = ChatLayoutContext.Provider;

export const useChatLayoutContext = () => useContext(ChatLayoutContext);
