'use client';

import type * as React from 'react';
import {
  useMessageBarBase_unstable,
  useMessageBarContext as useMessageBarContext_unstable,
  useMessageBarContextValue_unstable,
} from '@fluentui/react-message-bar';

import type { MessageBarProps, MessageBarState, MessageBarContextValues } from './MessageBar.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a MessageBar component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderMessageBar`.
 */
export const useMessageBar = (props: MessageBarProps, ref: React.Ref<HTMLDivElement>): MessageBarState => {
  'use no memo';

  const state: MessageBarState = useMessageBarBase_unstable(props, ref);

  state.root['data-layout'] = state.layout;
  state.root['data-intent'] = stringifyDataAttribute(state.intent);

  return state;
};

/**
 * Returns the context values provided by the nearest MessageBar.
 */
export const useMessageBarContext = useMessageBarContext_unstable;

/**
 * Maps MessageBar state to the context values passed down to child components.
 */
export const useMessageBarContextValues = useMessageBarContextValue_unstable as (
  state: MessageBarState,
) => MessageBarContextValues;
