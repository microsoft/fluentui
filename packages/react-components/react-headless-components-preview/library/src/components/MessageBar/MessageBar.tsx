'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MessageBarProps } from './MessageBar.types';
import { useMessageBar, useMessageBarContextValues } from './useMessageBar';
import { renderMessageBar } from './renderMessageBar';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Represents a message container with optional icon, body, title, and actions regions.
 */
export const MessageBar: ForwardRefComponent<MessageBarProps> = /*#__PURE__*/ composeComponent(
  'MessageBar',
  useMessageBar,
  renderMessageBar,
  useMessageBarContextValues,
);
