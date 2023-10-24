import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useSkeletonContext } from '../../contexts/SkeletonContext';
import type { SkeletonItemProps, SkeletonItemState } from './SkeletonItem.types';

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
  const { animation: contextAnimation, appearance: contextAppearance } = useSkeletonContext();
  const {
    animation = contextAnimation ?? 'wave',
    appearance = contextAppearance ?? 'opaque',
    size = 16,
    shape = 'rectangle',
  } = props;

  const root = slot.always(
    getIntrinsicElementProps('div', {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref: ref as React.Ref<HTMLDivElement>,
      ...props,
    }),
    { elementType: 'div' },
  );
  return { appearance, animation, size, shape, components: { root: 'div' }, root };
};
