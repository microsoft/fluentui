'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSkeletonItem, useSkeletonItem } from '@fluentui/react-headless-components-preview/skeleton';

import { mergeContextProps } from '../../utils/mergeContextProps';
import { useSkeletonContext } from '../Skeleton/SkeletonContext';
import type { SkeletonItemProps } from './SkeletonItem.types';
import { useSkeletonItemStyles } from './useSkeletonItemStyles';

/**
 * A SkeletonItem is a single loading placeholder. Windmod SkeletonItem: the headless skeleton
 * item decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const SkeletonItem: ForwardRefComponent<SkeletonItemProps> = React.forwardRef(
  // The context is read in the body, so the look props cannot default in the parameter list.
  (props, ref) => {
    const context = useSkeletonContext();
    const {
      animation = 'wave',
      appearance = 'opaque',
      size = 16,
      shape = 'rectangle',
      ...rest
    } = mergeContextProps(context, props);

    const state = useSkeletonItem(rest, ref as React.Ref<HTMLDivElement>);
    const styled = useSkeletonItemStyles({
      ...state,
      animation,
      appearance,
      size,
      shape,
    });

    return renderSkeletonItem(styled);
  },
);

SkeletonItem.displayName = 'SkeletonItem';
