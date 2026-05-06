'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MessageBarActionsProps } from './MessageBarActions.types';
import { useMessageBarActions, useMessageBarActionsContextValues } from './useMessageBarActions';
import { renderMessageBarActions } from './renderMessageBarActions';

/**
 * Represents the actions region of a MessageBar.
 */
export const MessageBarActions: ForwardRefComponent<MessageBarActionsProps> = React.forwardRef((props, ref) => {
  const state = useMessageBarActions(props, ref);
  const contextValues = useMessageBarActionsContextValues();

  return renderMessageBarActions(state, contextValues);
});

MessageBarActions.displayName = 'MessageBarActions';
