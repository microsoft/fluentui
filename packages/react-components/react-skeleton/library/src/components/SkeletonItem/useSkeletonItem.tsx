'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useSkeletonContext } from '../../contexts/SkeletonContext';
import type {
  SkeletonItemBaseProps,
  SkeletonItemBaseState,
  SkeletonItemProps,
  SkeletonItemState,
} from './SkeletonItem.types';

/**
 * Create the state required to render SkeletonItem.
 *
 * The returned state can be modified with hooks such as useSkeletonItemStyles_unstable,
 * before being passed to renderSkeletonItem_unstable.
 *
 * @param props - props from this instance of SkeletonItem
 * @param ref - reference to root HTMLElement of SkeletonItem
 */
export const useSkeletonItem_unstable = (props: SkeletonItemProps, ref: React.Ref<HTMLElement>): SkeletonItemState => {
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
    ...baseProps
  } = props;

  const baseState = useSkeletonItemBase_unstable(baseProps, ref as React.Ref<HTMLDivElement>);

  return {
    ...baseState,
    animation,
    appearance,
    size,
    shape,
  };
};

/**
 * Base hook for SkeletonItem component, which manages state related to slots structure.
 *
 * @param props - User provided props to the SkeletonItem component.
 * @param ref - User provided ref to be passed to the SkeletonItem component.
 */
export const useSkeletonItemBase_unstable = (
  props: SkeletonItemBaseProps,
  ref?: React.Ref<HTMLDivElement>,
): SkeletonItemBaseState => {
  const root = slot.always(
    getIntrinsicElementProps('div', {
      ref,
      ...props,
    }),
    { elementType: 'div' },
  );
  return { components: { root: 'div' }, root };
};
