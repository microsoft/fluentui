'use client';

import { useSkeletonContextValues as useSkeletonContextValues_unstable } from '@fluentui/react-skeleton';

import type { SkeletonState, SkeletonContextValues } from './Skeleton.types';

/**
 * Returns the state for a Skeleton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSkeleton`.
 */
export { useSkeletonBase_unstable as useSkeleton } from '@fluentui/react-skeleton';

/**
 * Returns the context values for a Skeleton component.
 */
export const useSkeletonContextValues = useSkeletonContextValues_unstable as (
  state: SkeletonState,
) => SkeletonContextValues;
