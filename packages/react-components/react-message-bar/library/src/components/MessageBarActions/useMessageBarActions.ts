'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type {
  MessageBarActionsProps,
  MessageBarActionsState,
  MessageBarActionsBaseProps,
  MessageBarActionsBaseState,
} from './MessageBarActions.types';
import { useMessageBarContext } from '../../contexts/messageBarContext';

/**
 * Create the state required to render MessageBarActions.
 *
 * The returned state can be modified with hooks such as useMessageBarActionsStyles_unstable,
 * before being passed to renderMessageBarActions_unstable.
 *
 * @param props - props from this instance of MessageBarActions
 * @param ref - reference to root HTMLElement of MessageBarActions
 */
export const useMessageBarActions_unstable = (
  props: MessageBarActionsProps,
  ref: React.Ref<HTMLDivElement>,
): MessageBarActionsState => {
  return useMessageBarActionsBase_unstable(props, ref);
};

/**
 * Base hook for MessageBarActions component, manages state and structure common to all variants of MessageBarActions
 *
 * @param props - base props from this instance of MessageBarActions
 * @param ref - reference to root HTMLElement of MessageBarActions
 */
export const useMessageBarActionsBase_unstable = (
  props: MessageBarActionsBaseProps,
  ref?: React.Ref<HTMLDivElement>,
): MessageBarActionsBaseState => {
  const { layout = 'singleline', actionsRef } = useMessageBarContext();
  return {
    components: {
      root: 'div',
      containerAction: 'div',
    },
    containerAction: slot.optional(props.containerAction, { renderByDefault: false, elementType: 'div' }),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, actionsRef),
        ...props,
      }),
      { elementType: 'div' },
    ),
    layout,
    hasActions: !!props.children,
  };
};
