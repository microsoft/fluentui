import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SkeletonCircleState, SkeletonCircleSlots } from './SkeletonCircle.types';

/**
 * Render the final JSX of SkeletonCircle
 */
export const renderSkeletonCircle_unstable = (state: SkeletonCircleState) => {
  const { slots, slotProps } = getSlots<SkeletonCircleSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
