'use client';

import type * as React from 'react';
import {
  useToolbar as useToolbarBase,
  useToolbarContext,
  useToolbarContextValues as useToolbarContextValuesBase,
} from '@fluentui/react-headless-components-preview/toolbar';
import type { ToolbarContextValues, ToolbarProps, ToolbarState } from './Toolbar.types';

export { useToolbarContext };

export const useToolbar = (props: ToolbarProps, ref: React.Ref<HTMLElement>): ToolbarState => {
  const { size = 'medium', ...rest } = props;
  const state = useToolbarBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-size': size,
    },
    size,
  };
};

export const useToolbarContextValues = (state: ToolbarState): ToolbarContextValues =>
  useToolbarContextValuesBase(state);
