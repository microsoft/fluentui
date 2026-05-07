'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MessageBarProps } from './MessageBar.types';
import { useMessageBar, useMessageBarContextValues } from './useMessageBar';
import { renderMessageBar } from './renderMessageBar';

/**
 * Represents a message container with optional icon, body, title, and actions regions.
 */
export const MessageBar: ForwardRefComponent<MessageBarProps> = React.forwardRef((props, ref) => {
  const state = useMessageBar(props, ref);
  const contextValues = useMessageBarContextValues(state);

  return renderMessageBar(state, contextValues);
});

MessageBar.displayName = 'MessageBar';
