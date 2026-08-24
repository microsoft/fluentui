'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSkeletonItem, useSkeletonItem } from '@fluentui/react-headless-components-preview/skeleton';

import { useSkeletonContext } from '../Skeleton/SkeletonContext';
import type { SkeletonItemProps, SkeletonItemState } from './SkeletonItem.types';
import { useSkeletonItemStyles } from './useSkeletonItemStyles';

/**
 * A SkeletonItem is a single loading placeholder. Windmod SkeletonItem: the headless skeleton
 * item decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const SkeletonItem: ForwardRefComponent<SkeletonItemProps> = React.forwardRef((props, ref) => {
  const {
    animation: contextAnimation,
    appearance: contextAppearance,
    size: contextSize,
    shape: contextShape,
  } = useSkeletonContext();
  const {
    animation = contextAnimation ?? 'wave',
    appearance = contextAppearance ?? 'opaque',
    size = contextSize ?? 16,
    shape = contextShape ?? 'rectangle',
    ...rest
  } = props;

  const state: SkeletonItemState = {
    ...useSkeletonItem(rest, ref as React.Ref<HTMLDivElement>),
    animation,
    appearance,
    size,
    shape,
  };

  return renderSkeletonItem(useSkeletonItemStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<SkeletonItemProps>;

SkeletonItem.displayName = 'SkeletonItem';
