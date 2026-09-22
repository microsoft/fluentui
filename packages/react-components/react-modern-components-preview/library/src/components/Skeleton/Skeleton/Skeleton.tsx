'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSkeleton } from './renderSkeleton';
import { useSkeleton, useSkeletonContextValues } from './useSkeleton';
import { useSkeletonStyles } from './useSkeletonStyles.styles';
import type { SkeletonProps } from './Skeleton.types';

/**
 * Skeleton represents content that is being loaded.
 */
export const Skeleton: ForwardRefComponent<SkeletonProps> = React.forwardRef((props, ref) => {
  const state = useSkeleton(props, ref);
  const contextValues = useSkeletonContextValues(state);

  useSkeletonStyles(state);

  return renderSkeleton(state, contextValues);
});

Skeleton.displayName = 'Skeleton';
