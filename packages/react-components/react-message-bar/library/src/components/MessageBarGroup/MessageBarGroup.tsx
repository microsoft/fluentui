import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useMessageBarGroup_unstable } from './useMessageBarGroup';
import { renderMessageBarGroup_unstable } from './renderMessageBarGroup';
import { useMessageBarGroupStyles_unstable } from './useMessageBarGroupStyles.styles';
import type { MessageBarGroupProps } from './MessageBarGroup.types';

/**
 * MessageBarGroup component
 */
export const MessageBarGroup: ForwardRefComponent<MessageBarGroupProps> = React.forwardRef((props, ref) => {
  const state = useMessageBarGroup_unstable(props, ref);

  useCustomStyleHook_unstable('useMessageBarGroupStyles_unstable')(state);
  useMessageBarGroupStyles_unstable(state);
  return renderMessageBarGroup_unstable(state);
});

MessageBarGroup.displayName = 'MessageBarGroup';
