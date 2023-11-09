import * as React from 'react';

export type MessageBarContextValue = {
  layout: 'multiline' | 'singleline' | 'auto';
  actionsRef: React.MutableRefObject<HTMLDivElement | null>;
  bodyRef: React.MutableRefObject<HTMLDivElement | null>;
  titleId: string;
};
const messageBarContext = React.createContext<MessageBarContextValue | undefined>(undefined);

export const messageBarContextDefaultValue: MessageBarContextValue = {
  titleId: '',
  layout: 'singleline',
  actionsRef: React.createRef(),
  bodyRef: React.createRef(),
};

export const MessageBarContextProvider = messageBarContext.Provider;
export const useMessageBarContext = () => React.useContext(messageBarContext) ?? messageBarContextDefaultValue;
