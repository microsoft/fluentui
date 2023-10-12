import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useMessageBarTitle_unstable } from './useMessageBarTitle';
import { renderMessageBarTitle_unstable } from './renderMessageBarTitle';
import { useMessageBarTitleStyles_unstable } from './useMessageBarTitleStyles.styles';
import type { MessageBarTitleProps } from './MessageBarTitle.types';

/**
 * MessageBarTitle component
 */
export const MessageBarTitle: ForwardRefComponent<MessageBarTitleProps> = React.forwardRef((props, ref) => {
  const state = useMessageBarTitle_unstable(props, ref);

  useMessageBarTitleStyles_unstable(state);
  useCustomStyleHook_unstable('useMessageBarTitleStyles_unstable')(state);
  return renderMessageBarTitle_unstable(state);
});

MessageBarTitle.displayName = 'MessageBarTitle';
