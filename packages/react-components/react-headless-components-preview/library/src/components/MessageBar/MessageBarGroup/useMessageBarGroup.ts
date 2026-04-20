'use client';

import type * as React from 'react';
import { useMessageBarGroup_unstable } from '@fluentui/react-message-bar';

import type { MessageBarGroupProps, MessageBarGroupState } from './MessageBarGroup.types';

/**
 * Returns the state for a MessageBarGroup component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderMessageBarGroup`.
 */
export const useMessageBarGroup = (
  props: MessageBarGroupProps,
  ref: React.Ref<HTMLDivElement>,
): MessageBarGroupState => {
  'use no memo';

  const state: MessageBarGroupState = useMessageBarGroup_unstable(props, ref);

  state.root['data-animate'] = state.animate;

  return state;
};
