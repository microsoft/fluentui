'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMessageBarTitle, useMessageBarTitle } from '@fluentui/react-headless-components-preview/message-bar';

import type { MessageBarTitleProps } from './MessageBarTitle.types';
import { useMessageBarTitleStyles } from './useMessageBarTitleStyles';

/**
 * A MessageBarTitle is the emphasised lead-in of a MessageBar body. Windmod MessageBarTitle: the
 * headless title decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const MessageBarTitle: ForwardRefComponent<MessageBarTitleProps> = React.forwardRef((props, ref) => {
  // The headless title accepts the wider HTMLElement ref that its span root implies.
  const state = useMessageBarTitle(props, ref as React.Ref<HTMLElement>);

  return renderMessageBarTitle(useMessageBarTitleStyles(state));
});

MessageBarTitle.displayName = 'MessageBarTitle';
