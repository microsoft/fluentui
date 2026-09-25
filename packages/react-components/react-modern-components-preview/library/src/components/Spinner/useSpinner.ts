'use client';

import type * as React from 'react';
import { useSpinner as useSpinnerBase } from '@fluentui/react-headless-components-preview/spinner';
import type { SpinnerProps, SpinnerState } from './Spinner.types';

/**
 * Create the state required to render Spinner.
 */
export const useSpinner = (props: SpinnerProps, ref: React.Ref<HTMLElement>): SpinnerState => {
  const { appearance = 'primary', size = 'medium', ...rest } = props;
  const state = useSpinnerBase(rest, ref);

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
