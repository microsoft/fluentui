'use client';

import type * as React from 'react';
import { useMessageBar as useMessageBarBase } from '@fluentui/react-headless-components-preview/message-bar';
import type { MessageBarProps, MessageBarState } from './MessageBar.types';

/** Create the state required to render MessageBar. */
export const useMessageBar = (props: MessageBarProps, ref: React.Ref<HTMLDivElement>): MessageBarState => {
  const { shape = 'rounded', ...rest } = props;
  const state = useMessageBarBase(rest, ref);

  return {
    ...state,
    shape,
    root: {
      ...state.root,
      'data-shape': shape,
    },
  };
};
