import { createContext, useContext } from 'react';

export type ChatBubbleTheme = 'classic' | 'bold';
export const defaultChatBubbleTheme: ChatBubbleTheme = 'classic';

const ChatBubbleThemeContext = createContext<ChatBubbleTheme>(defaultChatBubbleTheme);
export const ChatBubbleThemeContextProvider = ChatBubbleThemeContext.Provider;

export const useChatBubbleThemeContext = () => useContext(ChatBubbleThemeContext);
