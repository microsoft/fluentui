'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MessageBarBodyProps } from './MessageBarBody.types';
import { useMessageBarBody, useMessageBarBodyContextValues } from './useMessageBarBody';
import { renderMessageBarBody } from './renderMessageBarBody';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Represents the content region of a MessageBar.
 */
export const MessageBarBody: ForwardRefComponent<MessageBarBodyProps> = /*#__PURE__*/ composeComponent(
  'MessageBarBody',
  useMessageBarBody,
  renderMessageBarBody,
  useMessageBarBodyContextValues,
);
