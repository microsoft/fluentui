'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderMessageBarActions,
  useMessageBarActions,
  useMessageBarActionsContextValues,
} from '@fluentui/react-headless-components-preview/message-bar';

import type { MessageBarActionsProps } from './MessageBarActions.types';
import { useMessageBarActionsStyles } from './useMessageBarActionsStyles';

/**
 * A MessageBarActions holds the commands of a MessageBar. Windmod MessageBarActions: the headless
 * actions region decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const MessageBarActions: ForwardRefComponent<MessageBarActionsProps> = React.forwardRef((props, ref) => {
  return renderMessageBarActions(
    useMessageBarActionsStyles(useMessageBarActions(props, ref)),
    useMessageBarActionsContextValues(),
  );
});

MessageBarActions.displayName = 'MessageBarActions';
