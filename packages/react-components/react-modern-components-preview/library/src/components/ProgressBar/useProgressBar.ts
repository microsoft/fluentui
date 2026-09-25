'use client';

import type * as React from 'react';
import { motionSlot } from '@fluentui/react-motion';
import { useProgressBar as useProgressBarBase } from '@fluentui/react-headless-components-preview/progress-bar';
import { ProgressBarIndeterminateMotion } from './progressBarMotions';
import type { ProgressBarProps, ProgressBarState } from './ProgressBar.types';

const ZERO_THRESHOLD = 0.01;

/**
 * Create the state required to render ProgressBar.
 */
export const useProgressBar = (props: ProgressBarProps, ref: React.Ref<HTMLDivElement>): ProgressBarState => {
  const { shape = 'rounded', thickness = 'medium', color = 'brand', indeterminateMotion, ...rest } = props;
  const state = useProgressBarBase(rest, ref);

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      indeterminateMotion: ProgressBarIndeterminateMotion,
    },
    root: {
      ...state.root,
      'data-shape': shape,
      'data-thickness': thickness,
      'data-color': color,
      'data-transition': state.value !== undefined && state.value > ZERO_THRESHOLD ? '' : undefined,
    },
    shape,
    thickness,
    color,
    indeterminateMotion:
      state.value === undefined
        ? motionSlot(indeterminateMotion, {
            elementType: ProgressBarIndeterminateMotion,
            defaultProps: {},
          })
        : undefined,
  };
};
