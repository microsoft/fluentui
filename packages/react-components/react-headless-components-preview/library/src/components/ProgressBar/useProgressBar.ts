'use client';

import type * as React from 'react';
import { useProgressBarBase_unstable } from '@fluentui/react-progress';

import type { ProgressBarProps, ProgressBarState } from './ProgressBar.types';

/**
 * Create the state required to render ProgressBar.
 *
 * The returned state can be modified with hooks,
 * before being passed to renderProgressBar_unstable.
 *
 * @param props - props from this instance of ProgressBar
 * @param ref - reference to root HTMLDivElement of ProgressBar
 */
export const useProgressBar = (props: ProgressBarProps, ref: React.Ref<HTMLDivElement>): ProgressBarState => {
  'use no memo';

  const state = useProgressBarBase_unstable(props, ref);

  if (state.bar && state.value !== undefined) {
    state.bar.style = {
      width: Math.min(100, Math.max(0, (state.value / state.max) * 100)) + '%',
      ...state.bar.style,
    };
  }

  return state;
};
