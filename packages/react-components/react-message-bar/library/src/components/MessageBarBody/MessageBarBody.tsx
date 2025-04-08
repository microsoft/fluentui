import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useMessageBarBody_unstable } from './useMessageBarBody';
import { renderMessageBarBody_unstable } from './renderMessageBarBody';
import { useMessageBarBodyStyles_unstable } from './useMessageBarBodyStyles.styles';
import { useMessageBarBodyContextValues_unstable } from './useMessageBarBodyContextValues';
import type { MessageBarBodyProps } from './MessageBarBody.types';

/**
 * MessageBarBody component
 */
export const MessageBarBody: ForwardRefComponent<MessageBarBodyProps> = React.forwardRef((props, ref) => {
  const state = useMessageBarBody_unstable(props, ref);
  const ctx = useMessageBarBodyContextValues_unstable(state);

  useMessageBarBodyStyles_unstable(state);
  useCustomStyleHook_unstable('useMessageBarBodyStyles_unstable')(state);
  return renderMessageBarBody_unstable(state, ctx);
});

MessageBarBody.displayName = 'MessageBarBody';
