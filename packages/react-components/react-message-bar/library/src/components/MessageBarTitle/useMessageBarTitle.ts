'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type {
  MessageBarTitleProps,
  MessageBarTitleState,
  MessageBarTitleBaseProps,
  MessageBarTitleBaseState,
} from './MessageBarTitle.types';
import { useMessageBarContext } from '../../contexts/messageBarContext';

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
  return useMessageBarTitleBase_unstable(props, ref);
};

/**
 * Base hook for MessageBarTitle component, manages state and structure common to all variants of MessageBarTitle
 *
 * @param props - base props from this instance of MessageBarTitle
 * @param ref - reference to root HTMLElement of MessageBarTitle
 */
export const useMessageBarTitleBase_unstable = (
  props: MessageBarTitleBaseProps,
  ref?: React.Ref<HTMLElement>,
): MessageBarTitleBaseState => {
  const { titleId } = useMessageBarContext();

  return {
    components: {
      root: 'span',
    },
    root: slot.always(
      {
        ref,
        id: titleId,
        ...props,
      },
      { elementType: 'span' },
    ),
  };
};
