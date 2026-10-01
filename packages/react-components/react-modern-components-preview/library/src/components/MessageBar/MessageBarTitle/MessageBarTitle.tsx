'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MessageBarTitleProps } from './MessageBarTitle.types';
import { renderMessageBarTitle } from './renderMessageBarTitle';
import { useMessageBarTitle } from './useMessageBarTitle';
import { useMessageBarTitleStyles } from './useMessageBarTitleStyles.styles';

/** The emphasized title of a MessageBar. */
export const MessageBarTitle: ForwardRefComponent<MessageBarTitleProps> = React.forwardRef((props, ref) => {
  const state = useMessageBarTitle(props, ref);

  useMessageBarTitleStyles(state);
  return renderMessageBarTitle(state);
});

MessageBarTitle.displayName = 'MessageBarTitle';
