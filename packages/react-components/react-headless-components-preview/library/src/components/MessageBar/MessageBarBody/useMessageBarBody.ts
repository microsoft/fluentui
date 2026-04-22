'use client';

import type * as ReactTypes from 'react';
import { useMessageBarBody_unstable, useMessageBarBodyContextValues_unstable } from '@fluentui/react-message-bar';

import type { MessageBarBodyProps, MessageBarBodyState } from './MessageBarBody.types';

/**
 * Returns the state for a MessageBarBody component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderMessageBarBody`.
 */
export const useMessageBarBody = (
  props: MessageBarBodyProps,
  ref: ReactTypes.Ref<HTMLDivElement>,
): MessageBarBodyState => {
  'use no memo';

  return useMessageBarBody_unstable(props, ref);
};

/**
 * Returns the context values provided by MessageBarBody to nested links.
 */
export const useMessageBarBodyContextValues = useMessageBarBodyContextValues_unstable;
