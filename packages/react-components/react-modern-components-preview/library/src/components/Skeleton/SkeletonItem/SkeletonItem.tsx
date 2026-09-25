'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSkeletonItem } from './renderSkeletonItem';
import { useSkeletonItem } from './useSkeletonItem';
import { useSkeletonItemStyles } from './useSkeletonItemStyles.styles';
import type { SkeletonItemProps } from './SkeletonItem.types';

/**
 * SkeletonItem represents a single piece of content that is being loaded.
 */
export const SkeletonItem: ForwardRefComponent<SkeletonItemProps> = React.forwardRef((props, ref) => {
  const state = useSkeletonItem(props, ref);

  useSkeletonItemStyles(state);

  return renderSkeletonItem(state);
});

SkeletonItem.displayName = 'SkeletonItem';
