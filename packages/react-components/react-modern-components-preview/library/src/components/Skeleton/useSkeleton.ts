'use client';

import * as React from 'react';
import {
  useSkeleton as useSkeletonBase,
  useSkeletonContextValues as useSkeletonContextValuesBase,
} from '@fluentui/react-headless-components-preview/skeleton';
import type { SkeletonProps, SkeletonState } from './Skeleton.types';
import type { SkeletonVisualContextValue } from './SkeletonContext';

/**
 * Create the state required to render Skeleton.
 */
export const useSkeleton = (props: SkeletonProps, ref: React.Ref<HTMLElement>): SkeletonState => {
  const { animation = 'wave', appearance = 'opaque', size, shape, ...rest } = props;
  const state = useSkeletonBase(rest, ref as React.Ref<HTMLDivElement>);

  return {
    ...state,
    root: {
      ...state.root,
      'data-animation': animation,
      'data-appearance': appearance,
    },
    animation,
    appearance,
    size,
    shape,
  };
};

export type SkeletonContextValues = ReturnType<typeof useSkeletonContextValuesBase> & {
  modernSkeleton: SkeletonVisualContextValue;
};

/**
 * Returns the structural and visual context values for a Skeleton.
 */
export const useSkeletonContextValues = (state: SkeletonState): SkeletonContextValues => {
  const contextValues = useSkeletonContextValuesBase(state);
  const { animation, appearance, size, shape } = state;
  const modernSkeleton = React.useMemo(
    () => ({ animation, appearance, size, shape }),
    [animation, appearance, size, shape],
  );

  return { ...contextValues, modernSkeleton };
};
