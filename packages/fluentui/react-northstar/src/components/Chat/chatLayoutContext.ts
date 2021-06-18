import { createContext, useContext } from 'react';

export type ChatLayout = 'comfy' | 'compact';
export const defaultChatLayout: ChatLayout = 'comfy';

const ChatLayoutContext = createContext<ChatLayout>(defaultChatLayout);
export const ChatLayoutContextProvider = ChatLayoutContext.Provider;

export const useChatLayoutContext = () => useContext(ChatLayoutContext);
