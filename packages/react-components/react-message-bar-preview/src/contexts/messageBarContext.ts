import * as React from 'react';

export type MessageBarContextValue = {
  layout?: 'multiline' | 'singleline';
};
const messageBarContext = React.createContext<MessageBarContextValue | undefined>(undefined);

export const messageBarContextDefaultValue: MessageBarContextValue = {
  layout: 'singleline',
};

export const MessageBarContextProvider = messageBarContext.Provider;
export const useMessageBarContext = () => React.useContext(messageBarContext) ?? messageBarContextDefaultValue;
