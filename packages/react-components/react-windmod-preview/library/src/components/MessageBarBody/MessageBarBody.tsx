'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderMessageBarBody,
  useMessageBarBody,
  useMessageBarBodyContextValues,
} from '@fluentui/react-headless-components-preview/message-bar';

import type { MessageBarBodyProps } from './MessageBarBody.types';
import { useMessageBarBodyStyles } from './useMessageBarBodyStyles';

/**
 * A MessageBarBody holds the message text of a MessageBar. Windmod MessageBarBody: the headless
 * body decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const MessageBarBody: ForwardRefComponent<MessageBarBodyProps> = React.forwardRef((props, ref) => {
  const state = useMessageBarBody(props, ref);
  const styled = useMessageBarBodyStyles(state);

  return renderMessageBarBody(styled, useMessageBarBodyContextValues(styled));
});

MessageBarBody.displayName = 'MessageBarBody';
