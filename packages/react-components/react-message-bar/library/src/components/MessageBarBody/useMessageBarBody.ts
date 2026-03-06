'use client';

import * as React from 'react';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import type {
  MessageBarBodyProps,
  MessageBarBodyState,
  MessageBarBodyBaseProps,
  MessageBarBodyBaseState,
} from './MessageBarBody.types';
import { useMessageBarContext } from '../../contexts/messageBarContext';

/**
 * Create the state required to render MessageBarBody.
 *
 * The returned state can be modified with hooks such as useMessageBarBodyStyles_unstable,
 * before being passed to renderMessageBarBody_unstable.
 *
 * @param props - props from this instance of MessageBarBody
 * @param ref - reference to root HTMLElement of MessageBarBody
 */
export const useMessageBarBody_unstable = (
  props: MessageBarBodyProps,
  ref: React.Ref<HTMLDivElement>,
): MessageBarBodyState => {
  return useMessageBarBodyBase_unstable(props, ref);
};

/**
 * Base hook for MessageBarBody component, manages state and structure common to all variants of MessageBarBody
 *
 * @param props - base props from this instance of MessageBarBody
 * @param ref - reference to root HTMLElement of MessageBarBody
 */
export const useMessageBarBodyBase_unstable = (
  props: MessageBarBodyBaseProps,
  ref?: React.Ref<HTMLDivElement>,
): MessageBarBodyBaseState => {
  const { bodyRef } = useMessageBarContext();
  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      {
        ref: useMergedRefs(ref, bodyRef),
        ...props,
      },
      { elementType: 'div' },
    ),
  };
};
