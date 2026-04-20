'use client';

import type * as React from 'react';
import { useMessageBarTitle_unstable } from '@fluentui/react-message-bar';

import type { MessageBarTitleProps, MessageBarTitleState } from './MessageBarTitle.types';

/**
 * Returns the state for a MessageBarTitle component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderMessageBarTitle`.
 */
export const useMessageBarTitle = (props: MessageBarTitleProps, ref: React.Ref<HTMLElement>): MessageBarTitleState => {
  'use no memo';

  return useMessageBarTitle_unstable(props, ref);
};
