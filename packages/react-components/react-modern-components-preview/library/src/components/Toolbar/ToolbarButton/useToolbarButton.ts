'use client';

import type * as React from 'react';
import {
  useToolbarButton as useToolbarButtonBase,
  useToolbarContext,
} from '@fluentui/react-headless-components-preview/toolbar';
import type { ToolbarButtonProps, ToolbarButtonState } from './ToolbarButton.types';

export const useToolbarButton = (
  props: ToolbarButtonProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>,
): ToolbarButtonState => {
  const contextSize = useToolbarContext(context => context.size);
  const { appearance = 'subtle', ...rest } = props;
  const size = contextSize ?? 'medium';
  const shape = 'rounded';
  const state = useToolbarButtonBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-shape': shape,
      'data-size': size,
    },
    appearance,
    shape,
    size,
  };
};
