'use client';

import type * as React from 'react';
import { useToolbarDivider as useToolbarDividerBase } from '@fluentui/react-headless-components-preview/toolbar';
import type { ToolbarDividerProps, ToolbarDividerState } from './ToolbarDivider.types';

export const useToolbarDivider = (props: ToolbarDividerProps, ref: React.Ref<HTMLElement>): ToolbarDividerState => {
  const state = useToolbarDividerBase(props, ref);
  const alignContent = 'center';
  const appearance = 'default';
  const inset = false;

  return {
    ...state,
    root: {
      ...state.root,
      'data-align-content': alignContent,
      'data-appearance': appearance,
      'data-inset': undefined,
    },
    alignContent,
    appearance,
    inset,
  };
};
