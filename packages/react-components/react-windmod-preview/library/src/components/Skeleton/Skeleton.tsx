'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderSkeleton,
  useSkeleton,
  useSkeletonContextValues,
} from '@fluentui/react-headless-components-preview/skeleton';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { SkeletonProps } from './Skeleton.types';
import { SkeletonContextProvider, useSkeletonContext } from './SkeletonContext';
import { useSkeletonStyles } from './useSkeletonStyles';

/**
 * A Skeleton is a loading placeholder that groups SkeletonItems. Windmod Skeleton: the headless
 * skeleton decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Skeleton: ForwardRefComponent<SkeletonProps> = React.forwardRef(
  // The context is read in the body, so the look props cannot default in the parameter list.
  (props, ref) => {
    // Only two keys are folded in: `size` and `shape` carry no context fallback, because a nested
    // Skeleton without them resets them for its subtree while `animation` and `appearance` pass
    // through.
    const context = useSkeletonContext();
    const {
      animation = 'wave',
      appearance = 'opaque',
      size,
      shape,
      ...rest
    } = mergeContextProps({ animation: context.animation, appearance: context.appearance }, props);

    const styled = useSkeletonStyles({
      ...useSkeleton(rest, ref as React.Ref<HTMLDivElement>),
      animation,
      appearance,
      size,
      shape,
    });
    const contextValues = useSkeletonContextValues(styled);

    // renderSkeleton installs the headless group provider; this wrapper populates the windmod one
    // the windmod SkeletonItem reads. Both providers share the one memoised value object.
    return (
      <SkeletonContextProvider value={contextValues.skeletonGroup}>
        {renderSkeleton(styled, contextValues)}
      </SkeletonContextProvider>
    );
    // Casting is required due to lack of distributive union to support union on @types/react
  },
) as ForwardRefComponent<SkeletonProps>;

Skeleton.displayName = 'Skeleton';
