import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { SkeletonContextProvider } from '../../contexts/SkeletonContext';
import type { SkeletonContextValues, SkeletonSlots, SkeletonState } from './Skeleton.types';

/**
 * Render the final JSX of Skeleton
 */
export const renderSkeleton_unstable = (state: SkeletonState, contextValues: SkeletonContextValues) => {
  const { slots, slotProps } = getSlots<SkeletonSlots>(state);

  return (
    <SkeletonContextProvider value={contextValues.skeletonGroup}>
      <slots.root {...slotProps.root} />
    </SkeletonContextProvider>
  );
};
