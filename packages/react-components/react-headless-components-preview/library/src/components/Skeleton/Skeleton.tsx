'use client';

import * as React from 'react';
import type { SkeletonProps } from './Skeleton.types';
import { useSkeleton, useSkeletonContextValues } from './useSkeleton';
import { renderSkeleton } from './renderSkeleton';

/**
 * A skeleton component for loading placeholders.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const state = useSkeleton(props, ref);
  const contextValues = useSkeletonContextValues(state);

  return renderSkeleton(state, contextValues);
});

Skeleton.displayName = 'Skeleton';
