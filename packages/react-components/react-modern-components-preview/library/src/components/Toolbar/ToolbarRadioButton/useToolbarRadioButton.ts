'use client';

import type * as React from 'react';
import {
  useToolbarContext,
  useToolbarRadioButton as useToolbarRadioButtonBase,
} from '@fluentui/react-headless-components-preview/toolbar';
import type { ToolbarRadioButtonProps, ToolbarRadioButtonState } from './ToolbarRadioButton.types';

export const useToolbarRadioButton = (
  props: ToolbarRadioButtonProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>,
): ToolbarRadioButtonState => {
  const contextSize = useToolbarContext(context => context.size);
  const { appearance = 'subtle', size = contextSize ?? 'medium', ...rest } = props;
  const shape = 'rounded';
  const state = useToolbarRadioButtonBase(rest, ref);

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
