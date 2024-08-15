import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useMessageBar_unstable } from './useMessageBar';
import { renderMessageBar_unstable } from './renderMessageBar';
import { useMessageBarStyles_unstable } from './useMessageBarStyles.styles';
import type { MessageBarProps } from './MessageBar.types';
import { useMessageBarContextValue_unstable } from './useMessageBarContextValues';

/**
 * MessageBar component
 */
export const MessageBar: ForwardRefComponent<MessageBarProps> = React.forwardRef((props, ref) => {
  const state = useMessageBar_unstable(props, ref);

  useMessageBarStyles_unstable(state);
  useCustomStyleHook_unstable('useMessageBarStyles_unstable')(state);
  return renderMessageBar_unstable(state, useMessageBarContextValue_unstable(state));
});

MessageBar.displayName = 'MessageBar';
