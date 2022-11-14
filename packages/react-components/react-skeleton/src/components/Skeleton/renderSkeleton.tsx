import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SkeletonState, SkeletonSlots } from './Skeleton.types';

/**
 * Render the final JSX of Skeleton
 */
export const renderSkeleton_unstable = (state: SkeletonState) => {
  const { slots, slotProps } = getSlots<SkeletonSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      <slots.wrapper {...slotProps.wrapper}>
        {slots.gradient && <slots.gradient {...slotProps.gradient} />}
      </slots.wrapper>
      {slots.data && <slots.data {...slotProps.data} />}
    </slots.root>
  );
};
