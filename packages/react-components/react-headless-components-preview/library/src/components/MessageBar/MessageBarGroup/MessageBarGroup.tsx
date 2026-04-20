'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MessageBarGroupProps } from './MessageBarGroup.types';
import { useMessageBarGroup } from './useMessageBarGroup';
import { renderMessageBarGroup } from './renderMessageBarGroup';

/**
 * Represents a collection of MessageBar components with coordinated presence behavior.
 */
export const MessageBarGroup: ForwardRefComponent<MessageBarGroupProps> = React.forwardRef((props, ref) => {
  const state = useMessageBarGroup(props, ref);

  return renderMessageBarGroup(state);
});

MessageBarGroup.displayName = 'MessageBarGroup';
