'use client';

import type * as React from 'react';
import { useMessageBarActions_unstable, useMessageBarActionsContextValue_unstable } from '@fluentui/react-message-bar';

import type {
  MessageBarActionsProps,
  MessageBarActionsState,
  MessageBarActionsContextValues,
} from './MessageBarActions.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for a MessageBarActions component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderMessageBarActions`.
 */
export const useMessageBarActions = (
  props: MessageBarActionsProps,
  ref: React.Ref<HTMLDivElement>,
): MessageBarActionsState => {
  'use no memo';

  const state: MessageBarActionsState = useMessageBarActions_unstable(props, ref);

  state.root['data-layout'] = state.layout;
  state.root['data-has-actions'] = stringifyDataAttribute(state.hasActions);

  return state;
};

/**
 * Returns the context values provided by MessageBarActions to its child buttons.
 */
export const useMessageBarActionsContextValues =
  useMessageBarActionsContextValue_unstable as () => MessageBarActionsContextValues;
