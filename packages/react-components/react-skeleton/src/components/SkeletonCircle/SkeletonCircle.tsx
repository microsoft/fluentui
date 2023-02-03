import * as React from 'react';
import { useSkeletonCircle_unstable } from './useSkeletonCircle';
import { renderSkeletonCircle_unstable } from './renderSkeletonCircle';
import { useSkeletonCircleStyles_unstable } from './useSkeletonCircleStyles';
import type { SkeletonCircleProps } from './SkeletonCircle.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * SkeletonCircle component - TODO: add more docs
 */
export const SkeletonCircle: ForwardRefComponent<SkeletonCircleProps> = React.forwardRef((props, ref) => {
  const state = useSkeletonCircle_unstable(props, ref);

  useSkeletonCircleStyles_unstable(state);
  return renderSkeletonCircle_unstable(state);
});

SkeletonCircle.displayName = 'SkeletonCircle';
