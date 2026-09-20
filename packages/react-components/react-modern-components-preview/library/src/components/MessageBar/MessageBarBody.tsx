'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMessageBarBodyContextValues } from '@fluentui/react-headless-components-preview/message-bar';
import type { MessageBarBodyProps } from './MessageBarBody.types';
import { renderMessageBarBody } from './renderMessageBarBody';
import { useMessageBarBody } from './useMessageBarBody';
import { useMessageBarBodyStyles } from './useMessageBarBodyStyles.styles';

/** The main content region of a MessageBar. */
export const MessageBarBody: ForwardRefComponent<MessageBarBodyProps> = React.forwardRef((props, ref) => {
  const state = useMessageBarBody(props, ref);
  const contextValues = useMessageBarBodyContextValues(state);

  useMessageBarBodyStyles(state);
  return renderMessageBarBody(state, contextValues);
});

MessageBarBody.displayName = 'MessageBarBody';
