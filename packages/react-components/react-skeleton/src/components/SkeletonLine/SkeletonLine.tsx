import * as React from 'react';
import { useSkeletonLine_unstable } from './useSkeletonLine';
import { renderSkeletonLine_unstable } from './renderSkeletonLine';
import { useSkeletonLineStyles_unstable } from './useSkeletonLineStyles';
import type { SkeletonLineProps } from './SkeletonLine.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * SkeletonLine component - TODO: add more docs
 */
export const SkeletonLine: ForwardRefComponent<SkeletonLineProps> = React.forwardRef((props, ref) => {
  const state = useSkeletonLine_unstable(props, ref);

  useSkeletonLineStyles_unstable(state);
  return renderSkeletonLine_unstable(state);
});

SkeletonLine.displayName = 'SkeletonLine';
