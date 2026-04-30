'use client';

import type * as React from 'react';
import {
  useSkeletonBase_unstable,
  useSkeletonContextValues as useSkeletonContextValues_unstable,
} from '@fluentui/react-skeleton';

import type { SkeletonProps, SkeletonState, SkeletonContextValues } from './Skeleton.types';

/**
 * Returns the state for a Skeleton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSkeleton`.
 */
export const useSkeleton = (props: SkeletonProps, ref: React.Ref<HTMLDivElement>): SkeletonState => {
  const state = useSkeletonBase_unstable(props, ref);

  return state;
};

export const useSkeletonContextValues = useSkeletonContextValues_unstable as (
  state: SkeletonState,
) => SkeletonContextValues;
