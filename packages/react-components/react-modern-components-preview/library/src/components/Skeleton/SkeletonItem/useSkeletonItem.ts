'use client';

import type * as React from 'react';
import { useSkeletonItem as useSkeletonItemBase } from '@fluentui/react-headless-components-preview/skeleton';
import { useSkeletonVisualContext } from '../Skeleton/SkeletonContext';
import type { SkeletonItemProps, SkeletonItemState } from './SkeletonItem.types';

/**
 * Create the state required to render SkeletonItem.
 */
export const useSkeletonItem = (props: SkeletonItemProps, ref: React.Ref<HTMLElement>): SkeletonItemState => {
  const context = useSkeletonVisualContext();
  const {
    animation = context.animation ?? 'wave',
    appearance = context.appearance ?? 'opaque',
    size = context.size ?? 16,
    shape = context.shape ?? 'rectangle',
    ...rest
  } = props;
  const state = useSkeletonItemBase(rest, ref as React.Ref<HTMLDivElement>);

  return {
    ...state,
    root: {
      ...state.root,
      'data-animation': animation,
      'data-appearance': appearance,
      'data-size': `${size}`,
      'data-shape': shape,
    },
    animation,
    appearance,
    size,
    shape,
  };
};
