import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useMessageBarActions_unstable } from './useMessageBarActions';
import { renderMessageBarActions_unstable } from './renderMessageBarActions';
import { useMessageBarActionsStyles_unstable } from './useMessageBarActionsStyles.styles';
import type { MessageBarActionsProps } from './MessageBarActions.types';
import { useMessageBarActionsContextValue_unstable } from './useMessageBarActionsContextValues';

/**
 * MessageBarActions component
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const MessageBarActions: ForwardRefComponent<MessageBarActionsProps> = React.forwardRef((props, ref) => {
  const state = useMessageBarActions_unstable(props, ref);

  useMessageBarActionsStyles_unstable(state);
  useCustomStyleHook_unstable('useMessageBarActionsStyles_unstable')(state);
  return renderMessageBarActions_unstable(state, useMessageBarActionsContextValue_unstable());
});

MessageBarActions.displayName = 'MessageBarActions';
