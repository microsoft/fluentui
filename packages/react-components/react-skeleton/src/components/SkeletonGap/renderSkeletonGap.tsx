import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SkeletonGapState, SkeletonGapSlots } from './SkeletonGap.types';

/**
 * Render the final JSX of SkeletonGap
 */
export const renderSkeletonGap_unstable = (state: SkeletonGapState) => {
  const { slots, slotProps } = getSlots<SkeletonGapSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
