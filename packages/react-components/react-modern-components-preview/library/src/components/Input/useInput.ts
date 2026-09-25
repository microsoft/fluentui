'use client';

import type * as React from 'react';
import { useInput as useInputBase } from '@fluentui/react-headless-components-preview/input';
import type { InputProps, InputState } from './Input.types';

/**
 * Create the state required to render Input.
 */
export const useInput = (props: InputProps, ref: React.Ref<HTMLInputElement>): InputState => {
  const { appearance = 'outline', size = 'medium', ...rest } = props;
  const state = useInputBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-content-after': state.contentAfter ? '' : undefined,
      'data-content-before': state.contentBefore ? '' : undefined,
      'data-size': size,
    },
    appearance,
    size,
  };
};
