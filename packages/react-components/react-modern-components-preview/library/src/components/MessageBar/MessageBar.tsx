'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMessageBarContextValues } from '@fluentui/react-headless-components-preview/message-bar';
import type { MessageBarProps } from './MessageBar.types';
import { renderMessageBar } from './renderMessageBar';
import { useMessageBar } from './useMessageBar';
import { useMessageBarStyles } from './useMessageBarStyles.styles';

/** A message container with optional icon, body, title, and actions regions. */
export const MessageBar: ForwardRefComponent<MessageBarProps> = React.forwardRef((props, ref) => {
  const state = useMessageBar(props, ref);
  const contextValues = useMessageBarContextValues(state);

  useMessageBarStyles(state);
  return renderMessageBar(state, contextValues);
});

MessageBar.displayName = 'MessageBar';
