'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MessageBarBodyProps } from './MessageBarBody.types';
import { useMessageBarBody, useMessageBarBodyContextValues } from './useMessageBarBody';
import { renderMessageBarBody } from './renderMessageBarBody';

/**
 * Represents the content region of a MessageBar.
 */
export const MessageBarBody: ForwardRefComponent<MessageBarBodyProps> = React.forwardRef((props, ref) => {
  const state = useMessageBarBody(props, ref);
  const contextValues = useMessageBarBodyContextValues(state);

  return renderMessageBarBody(state, contextValues);
});

MessageBarBody.displayName = 'MessageBarBody';
