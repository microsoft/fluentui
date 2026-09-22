'use client';

import type * as React from 'react';
import {
  useToolbarContext,
  useToolbarToggleButton as useToolbarToggleButtonBase,
} from '@fluentui/react-headless-components-preview/toolbar';
import type { ToolbarToggleButtonProps, ToolbarToggleButtonState } from './ToolbarToggleButton.types';

export const useToolbarToggleButton = (
  props: ToolbarToggleButtonProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>,
): ToolbarToggleButtonState => {
  const contextSize = useToolbarContext(context => context.size);
  const { appearance = 'subtle', size = contextSize ?? 'medium', ...rest } = props;
  const shape = 'rounded';
  const state = useToolbarToggleButtonBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-accessible': state.isAccessible ? '' : undefined,
      'data-appearance': appearance,
      'data-shape': shape,
      'data-size': size,
    },
    appearance,
    shape,
    size,
  };
};
