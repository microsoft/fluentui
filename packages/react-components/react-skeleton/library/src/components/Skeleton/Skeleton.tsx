import * as React from 'react';
import { useSkeleton_unstable } from './useSkeleton';
import { renderSkeleton_unstable } from './renderSkeleton';
import { useSkeletonStyles_unstable } from './useSkeletonStyles.styles';
import { useSkeletonContextValues } from './useSkeletonContextValues';
import type { SkeletonProps } from './Skeleton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Skeleton component - TODO: add more docs
 */
export const Skeleton: ForwardRefComponent<SkeletonProps> = React.forwardRef((props, ref) => {
  const state = useSkeleton_unstable(props, ref);
  const contextValues = useSkeletonContextValues(state);

  useSkeletonStyles_unstable(state);
  return renderSkeleton_unstable(state, contextValues);
});

Skeleton.displayName = 'Skeleton';
