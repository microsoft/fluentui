'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMessageBarActionsContextValues } from '@fluentui/react-headless-components-preview/message-bar';
import type { MessageBarActionsProps } from './MessageBarActions.types';
import { renderMessageBarActions } from './renderMessageBarActions';
import { useMessageBarActions } from './useMessageBarActions';
import { useMessageBarActionsStyles } from './useMessageBarActionsStyles.styles';

/** The actions region of a MessageBar. */
export const MessageBarActions: ForwardRefComponent<MessageBarActionsProps> = React.forwardRef((props, ref) => {
  const state = useMessageBarActions(props, ref);
  const contextValues = useMessageBarActionsContextValues();

  useMessageBarActionsStyles(state);
  return renderMessageBarActions(state, contextValues);
});

MessageBarActions.displayName = 'MessageBarActions';
