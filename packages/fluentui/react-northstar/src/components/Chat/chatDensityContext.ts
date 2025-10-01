import * as React from 'react';

export type ChatDensity = 'comfy' | 'compact';
export const defaultChatDensity: ChatDensity = 'comfy';

const ChatDensityContext = React.createContext<ChatDensity>(defaultChatDensity);

export const ChatDensityContextProvider = ChatDensityContext.Provider;

export function useChatDensityContext(): ChatDensity {
  return React.useContext(ChatDensityContext);
}
