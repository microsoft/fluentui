import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SkeletonItemState, SkeletonItemSlots } from './SkeletonItem.types';

/**
 * Render the final JSX of SkeletonItem
 */
export const renderSkeletonItem_unstable = (state: SkeletonItemState) => {
  const { slots, slotProps } = getSlots<SkeletonItemSlots>(state);

  return <slots.root {...slotProps.root} />;
};
