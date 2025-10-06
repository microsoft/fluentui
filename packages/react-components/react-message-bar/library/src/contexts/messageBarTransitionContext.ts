'use client';

import * as React from 'react';

export type MessageBarTransitionContextValue = {
  /**
   * @deprecated CSS className is no longer used for this transition, replaced by motion components
   */
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
 * Context to pass nodeRef for animation to MessageBar components
 * @internal
 */
export const MessageBarTransitionContextProvider = messageBarTransitionContext.Provider;
/**
 * @internal
 */
export const useMessageBarTransitionContext = (): MessageBarTransitionContextValue =>
  React.useContext(messageBarTransitionContext) ?? messageBarTransitionContextDefaultValue;
