import * as React from 'react';

/**
 * @deprecated Code is unused, replaced by motion components
 */
export type MessageBarTransitionContextValue = {
  className: string;
  nodeRef: React.Ref<HTMLDivElement | null>;
};

const messageBarTransitionContext = React.createContext<MessageBarTransitionContextValue | undefined>(undefined);

/**
 * @internal
 * @deprecated Code is unused, replaced by motion components
 */
export const messageBarTransitionContextDefaultValue: MessageBarTransitionContextValue = {
  className: '',
  nodeRef: React.createRef<HTMLDivElement | null>(),
};

/**
 * Context to pass animation className to MessageBar components
 * @internal
 * @deprecated Code is unused, replaced by motion components
 */
export const MessageBarTransitionContextProvider = messageBarTransitionContext.Provider;
/**
 * @internal
 * @deprecated Code is unused, replaced by motion components
 */
export const useMessageBarTransitionContext = () =>
  React.useContext(messageBarTransitionContext) ?? messageBarTransitionContextDefaultValue;
