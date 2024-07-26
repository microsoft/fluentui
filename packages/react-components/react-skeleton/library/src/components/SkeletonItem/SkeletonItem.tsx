import * as React from 'react';
import { useSkeletonItem_unstable } from './useSkeletonItem';
import { renderSkeletonItem_unstable } from './renderSkeletonItem';
import { useSkeletonItemStyles_unstable } from './useSkeletonItemStyles.styles';
import type { SkeletonItemProps } from './SkeletonItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const SkeletonItem: ForwardRefComponent<SkeletonItemProps> = React.forwardRef((props, ref) => {
  const state = useSkeletonItem_unstable(props, ref);

  useSkeletonItemStyles_unstable(state);
  return renderSkeletonItem_unstable(state);
});

SkeletonItem.displayName = 'SkeletonItem';
