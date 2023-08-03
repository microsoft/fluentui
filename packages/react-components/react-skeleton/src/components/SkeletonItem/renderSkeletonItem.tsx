/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { SkeletonItemState, SkeletonItemSlots } from './SkeletonItem.types';

/**
 * Render the final JSX of SkeletonItem
 */
export const renderSkeletonItem_unstable = (state: SkeletonItemState) => {
  const { slots, slotProps } = getSlotsNext<SkeletonItemSlots>(state);

  return <slots.root {...slotProps.root} />;
};
