'use client';

import type * as React from 'react';
import { useSpinButton as useSpinButtonBase } from '@fluentui/react-headless-components-preview/spin-button';
import type { SpinButtonProps, SpinButtonState } from './SpinButton.types';

export const useSpinButton = (props: SpinButtonProps, ref: React.Ref<HTMLInputElement>): SpinButtonState => {
  const { appearance = 'outline', size = 'medium', ...rest } = props;
  const state = useSpinButtonBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-size': size,
    },
    appearance,
    size,
  };
};
