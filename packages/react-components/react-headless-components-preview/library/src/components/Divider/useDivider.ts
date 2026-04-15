'use client';

import type * as React from 'react';
import { useDividerBase_unstable } from '@fluentui/react-divider';

import type { DividerProps, DividerState } from './Divider.types';

/**
 * Returns the state for a Divider component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderDivider`.
 */
export const useDivider = (props: DividerProps, ref: React.Ref<HTMLElement>): DividerState => {
  const state = useDividerBase_unstable(props, ref);

  Object.assign(state.root, {
    'data-orientation': props.vertical ? 'vertical' : 'horizontal',
  });

  return state;
};
