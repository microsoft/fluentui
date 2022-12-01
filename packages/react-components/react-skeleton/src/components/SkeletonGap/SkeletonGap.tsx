import * as React from 'react';
import { useSkeletonGap_unstable } from './useSkeletonGap';
import { renderSkeletonGap_unstable } from './renderSkeletonGap';
import { useSkeletonGapStyles_unstable } from './useSkeletonGapStyles';
import type { SkeletonGapProps } from './SkeletonGap.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * SkeletonGap component - TODO: add more docs
 */
export const SkeletonGap: ForwardRefComponent<SkeletonGapProps> = React.forwardRef((props, ref) => {
  const state = useSkeletonGap_unstable(props, ref);

  useSkeletonGapStyles_unstable(state);
  return renderSkeletonGap_unstable(state);
});

SkeletonGap.displayName = 'SkeletonGap';
