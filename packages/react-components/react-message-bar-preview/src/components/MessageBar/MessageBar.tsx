import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMessageBar_unstable } from './useMessageBar';
import { renderMessageBar_unstable } from './renderMessageBar';
import { useMessageBarStyles_unstable } from './useMessageBarStyles.styles';
import type { MessageBarProps } from './MessageBar.types';

/**
 * MessageBar component
 */
export const MessageBar: ForwardRefComponent<MessageBarProps> = React.forwardRef((props, ref) => {
  const state = useMessageBar_unstable(props, ref);

  useMessageBarStyles_unstable(state);
  return renderMessageBar_unstable(state);
});

MessageBar.displayName = 'MessageBar';
