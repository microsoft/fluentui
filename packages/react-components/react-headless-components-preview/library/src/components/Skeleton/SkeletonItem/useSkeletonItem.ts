'use client';

import type * as React from 'react';
import { useSkeletonItemBase_unstable } from '@fluentui/react-skeleton';

import type { SkeletonItemProps, SkeletonItemState } from './SkeletonItem.types';

/**
 * Returns the state for a SkeletonItem component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSkeletonItem`.
 */
export const useSkeletonItem = (props: SkeletonItemProps, ref: React.Ref<HTMLDivElement>): SkeletonItemState => {
  const state = useSkeletonItemBase_unstable(props, ref);

  return state;
};
