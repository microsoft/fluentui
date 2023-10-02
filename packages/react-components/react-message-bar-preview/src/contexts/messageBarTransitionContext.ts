import * as React from 'react';

const messageBarContext = React.createContext<string | undefined>(undefined);

/**
 * @internal
 */
export const messageBarContextDefaultValue = '';

/**
 * Context to pass animation className to MessageBar components
 * @internal
 */
export const MessageBarTransitionContextProvider = messageBarContext.Provider;
/**
 * @internal
 */
export const useMessageBarTransitionContext = () =>
  React.useContext(messageBarContext) ?? messageBarContextDefaultValue;
