'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MessageBarActionsProps } from './MessageBarActions.types';
import { useMessageBarActions, useMessageBarActionsContextValues } from './useMessageBarActions';
import { renderMessageBarActions } from './renderMessageBarActions';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Represents the actions region of a MessageBar.
 */
export const MessageBarActions: ForwardRefComponent<MessageBarActionsProps> = /*#__PURE__*/ composeComponent(
  'MessageBarActions',
  useMessageBarActions,
  renderMessageBarActions,
  useMessageBarActionsContextValues,
);
