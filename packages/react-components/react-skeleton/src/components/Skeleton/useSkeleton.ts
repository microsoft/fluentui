import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { SkeletonProps, SkeletonState } from './Skeleton.types';
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
  const { animation = contextAnimation ?? 'wave', appearance = contextAppearance ?? 'opaque' } = props;

  const root = getNativeElementProps('div', {
    ref,
    role: 'progressbar',
    'aria-busy': true,
    'aria-label': 'Loading Content',
    ...props,
  });

  return {
    animation,
    appearance,
    components: {
      root: 'div',
    },
    root,
  };
};
