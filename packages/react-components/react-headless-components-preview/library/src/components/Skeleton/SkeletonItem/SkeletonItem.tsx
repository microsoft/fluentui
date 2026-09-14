'use client';

import * as React from 'react';
import type { SkeletonItemProps } from './SkeletonItem.types';
import { useSkeletonItem } from './useSkeletonItem';
import { renderSkeletonItem } from './renderSkeletonItem';

/**
 * A SkeletonItem component for loading placeholders.
 */
export const SkeletonItem = React.forwardRef<HTMLDivElement, SkeletonItemProps>((props, ref) => {
  const state = useSkeletonItem(props, ref);

  return renderSkeletonItem(state);
});

SkeletonItem.displayName = 'SkeletonItem';
