import { createContext, useContext } from 'react';

export type ChatDensity = 'comfy' | 'compact';
export const defaultChatDensity: ChatDensity = 'comfy';

const ChatDensityContext = createContext<ChatDensity>(defaultChatDensity);
export const ChatDensityContextProvider = ChatDensityContext.Provider;

export const useChatDensityContext = () => useContext(ChatDensityContext);
