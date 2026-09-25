'use client';

import type * as React from 'react';
import { useBadge as useBadgeBase } from '@fluentui/react-headless-components-preview/badge';
import type { BadgeProps, BadgeState } from './Badge.types';

/**
 * Create the state required to render Badge.
 */
export const useBadge = (props: BadgeProps, ref: React.Ref<HTMLDivElement>): BadgeState => {
  const { appearance = 'filled', color = 'brand', shape = 'circular', size = 'medium', ...rest } = props;
  const state = useBadgeBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-color': color,
      'data-shape': shape,
      'data-size': size,
    },
    appearance,
    color,
    shape,
    size,
  };
};
