import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SkeletonLineState, SkeletonLineSlots } from './SkeletonLine.types';

/**
 * Render the final JSX of SkeletonLine
 */
export const renderSkeletonLine_unstable = (state: SkeletonLineState) => {
  const { slots, slotProps } = getSlots<SkeletonLineSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
