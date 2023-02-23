import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { SkeletonContextProvider, SkeletonContextValue } from '../../contexts/SkeletonContext';
import type { SkeletonState, SkeletonSlots } from './Skeleton.types';

/**
 * Render the final JSX of Skeleton
 */
export const renderSkeleton_unstable = (state: SkeletonState, contextValues: SkeletonContextValue) => {
  const { slots, slotProps } = getSlots<SkeletonSlots>(state);

  return (
    <SkeletonContextProvider value={contextValues}>
      <slots.root {...slotProps.root} />
    </SkeletonContextProvider>
  );
};
