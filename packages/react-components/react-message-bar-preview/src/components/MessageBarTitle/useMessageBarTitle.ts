import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { MessageBarTitleProps, MessageBarTitleState } from './MessageBarTitle.types';

/**
 * Create the state required to render MessageBarTitle.
 *
 * The returned state can be modified with hooks such as useMessageBarTitleStyles_unstable,
 * before being passed to renderMessageBarTitle_unstable.
 *
 * @param props - props from this instance of MessageBarTitle
 * @param ref - reference to root HTMLElement of MessageBarTitle
 */
export const useMessageBarTitle_unstable = (
  props: MessageBarTitleProps,
  ref: React.Ref<HTMLElement>,
): MessageBarTitleState => {
  return {
    components: {
      root: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('span', {
        ref,
        ...props,
      }),
      { elementType: 'span' },
    ),
  };
};
