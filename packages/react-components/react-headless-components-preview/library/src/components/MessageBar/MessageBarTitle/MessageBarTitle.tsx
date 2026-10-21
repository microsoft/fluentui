'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MessageBarTitleProps } from './MessageBarTitle.types';
import { useMessageBarTitle } from './useMessageBarTitle';
import { renderMessageBarTitle } from './renderMessageBarTitle';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Represents the title region of a MessageBar.
 */
export const MessageBarTitle: ForwardRefComponent<MessageBarTitleProps> = /*#__PURE__*/ composeComponent(
  'MessageBarTitle',
  useMessageBarTitle,
  renderMessageBarTitle,
);
