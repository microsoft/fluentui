'use client';

import * as React from 'react';
import type { DividerProps, DividerState } from './Divider.types';
import { useDividerBase_unstable } from './useDividerBase';

/**
 * Returns the props and state required to render the component
 * @param props - User-provided props to the Divider component.
 * @param ref - User-provided ref to be passed to the Divider component.
 */
export const useDivider_unstable = (props: DividerProps, ref: React.Ref<HTMLElement>): DividerState => {
  const { alignContent = 'center', appearance = 'default', inset = false, vertical = false, ...rest } = props;

  const state = useDividerBase_unstable(rest, ref);

  return {
    alignContent,
    appearance,
    inset,
    vertical,
    ...state,
    root: {
      ...state.root,
      'aria-orientation': vertical ? 'vertical' : 'horizontal',
    },
  };
};
