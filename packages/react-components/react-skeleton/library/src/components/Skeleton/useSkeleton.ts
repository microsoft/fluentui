'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { SkeletonBaseProps, SkeletonBaseState, SkeletonProps, SkeletonState } from './Skeleton.types';
import { useSkeletonContext } from '../../contexts/SkeletonContext';

/**
 * Create the state required to render Skeleton.
 *
 * The returned state can be modified with hooks such as useSkeletonStyles_unstable,
 * before being passed to renderSkeleton_unstable.
 *
 * @param props - props from this instance of Skeleton
 * @param ref - reference to root HTMLElement of Skeleton
 */
export const useSkeleton_unstable = (props: SkeletonProps, ref: React.Ref<HTMLElement>): SkeletonState => {
  const { animation: contextAnimation, appearance: contextAppearance } = useSkeletonContext();
  const {
    animation = contextAnimation ?? 'wave',
    appearance = contextAppearance ?? 'opaque',
    size,
    shape,
    ...baseProps
  } = props;

  const baseState = useSkeletonBase_unstable(baseProps, ref);

  return {
    ...baseState,
    animation,
    appearance,
    size,
    shape,
  };
};

/**
 * Base hook for Skeleton component, which manages state related to slots structure and ARIA attributes.
 *
 * @param props - User provided props to the Skeleton component.
 * @param ref - User provided ref to be passed to the Skeleton component.
 */
export const useSkeletonBase_unstable = (props: SkeletonBaseProps, ref?: React.Ref<HTMLElement>): SkeletonBaseState => {
  const root = slot.always(
    getIntrinsicElementProps('div', {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref: ref as React.Ref<HTMLDivElement>,
      role: 'progressbar',
      'aria-busy': true,
      ...props,
    }),
    { elementType: 'div' },
  );
  return { components: { root: 'div' }, root };
};
