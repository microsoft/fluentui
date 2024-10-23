import * as React from 'react';

export type MessageBarTransitionContextValue = {
  className: string;
  nodeRef: React.Ref<HTMLDivElement | null>;
};

const messageBarTransitionContext = React.createContext<MessageBarTransitionContextValue | undefined>(undefined);

/**
 * @internal
 */
export const messageBarTransitionContextDefaultValue: MessageBarTransitionContextValue = {
  className: '',
  nodeRef: React.createRef<HTMLDivElement | null>(),
};

/**
 * Context to pass animation className to MessageBar components
 * @internal
 */
export const MessageBarTransitionContextProvider = messageBarTransitionContext.Provider;
/**
 * @internal
 */
export const useMessageBarTransitionContext = () =>
  React.useContext(messageBarTransitionContext) ?? messageBarTransitionContextDefaultValue;
