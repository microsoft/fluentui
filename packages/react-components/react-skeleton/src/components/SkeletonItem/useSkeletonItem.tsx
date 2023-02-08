import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
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
  const { size = 16, shape = 'rectangle' } = props;

  const root = getNativeElementProps('div', {
    ref,
    ...props,
  });

  return {
    size,
    shape,
    components: {
      root: 'div',
    },
    root,
  };
};
