'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MessageBarTitleProps } from './MessageBarTitle.types';
import { useMessageBarTitle } from './useMessageBarTitle';
import { renderMessageBarTitle } from './renderMessageBarTitle';

/**
 * Represents the title region of a MessageBar.
 */
export const MessageBarTitle: ForwardRefComponent<MessageBarTitleProps> = React.forwardRef((props, ref) => {
  const state = useMessageBarTitle(props, ref);

  return renderMessageBarTitle(state);
});

MessageBarTitle.displayName = 'MessageBarTitle';
