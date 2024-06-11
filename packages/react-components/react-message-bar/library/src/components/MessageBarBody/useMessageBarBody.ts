import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { MessageBarBodyProps, MessageBarBodyState } from './MessageBarBody.types';
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
  const { bodyRef } = useMessageBarContext();
  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, bodyRef),
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
