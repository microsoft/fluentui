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
    const {
      animation = 'wave',
      appearance = 'opaque',
      size = 16,
      shape = 'rectangle',
      ...rest
    } = mergeContextProps(useSkeletonContext(), props);

    return renderSkeletonItem(
      useSkeletonItemStyles({
        ...useSkeletonItem(rest, ref as React.Ref<HTMLDivElement>),
        animation,
        appearance,
        size,
        shape,
      }),
    );
    // Casting is required due to lack of distributive union to support union on @types/react
  },
) as ForwardRefComponent<SkeletonItemProps>;

SkeletonItem.displayName = 'SkeletonItem';
