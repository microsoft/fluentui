'use client';

import type * as React from 'react';
import { useCompoundButton as useCompoundButtonBase } from '@fluentui/react-headless-components-preview/compound-button';
import { useButtonContext } from '@fluentui/react-headless-components-preview/button';
import type { CompoundButtonProps, CompoundButtonState } from './CompoundButton.types';

export const useCompoundButton = (
  props: CompoundButtonProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>,
): CompoundButtonState => {
  const context = useButtonContext();
  const { appearance = 'secondary', shape = 'rounded', size = context.size ?? 'medium', ...rest } = props;
  const state = useCompoundButtonBase(rest, ref);

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
