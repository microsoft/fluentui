'use client';

import type * as React from 'react';
import { useButtonContext } from '@fluentui/react-headless-components-preview/button';
import { useToggleButton as useToggleButtonBase } from '@fluentui/react-headless-components-preview/toggle-button';
import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';

export const useToggleButton = (
  props: ToggleButtonProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>,
): ToggleButtonState => {
  const context = useButtonContext();
  const { appearance = 'secondary', shape = 'rounded', size = context.size ?? 'medium', ...rest } = props;
  const state = useToggleButtonBase(rest, ref);

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
