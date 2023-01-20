import { createContext } from '@fluentui/react-bindings';

export type ChatMessageLayout = 'default' | 'refresh';

export type ChatItemContextValue = {
  attached: boolean | 'top' | 'bottom';
  unstable_layout: ChatMessageLayout;
};

export const ChatItemContext = createContext<ChatItemContextValue>({ attached: false, unstable_layout: 'default' });

export const ChatItemContextProvider = ChatItemContext.Provider;
