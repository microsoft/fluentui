'use client';

import type * as React from 'react';
import { useDivider as useDividerBase } from '@fluentui/react-headless-components-preview/divider';
import type { DividerProps, DividerState } from './Divider.types';

/**
 * Create the state required to render Divider.
 */
export const useDivider = (props: DividerProps, ref: React.Ref<HTMLElement>): DividerState => {
  const { alignContent = 'center', appearance = 'default', inset = false, ...rest } = props;
  const state = useDividerBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-align-content': alignContent,
      'data-appearance': appearance,
      'data-inset': inset ? '' : undefined,
    },
    alignContent,
    appearance,
    inset,
  };
};
