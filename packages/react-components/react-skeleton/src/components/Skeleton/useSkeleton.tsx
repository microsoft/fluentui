import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { SkeletonProps, SkeletonState } from './Skeleton.types';
import { SkeletonLine } from '../SkeletonLine/SkeletonLine';
//import { SkeletonElementsGroup } from '../SkeletonElementsGroup/SkeletonElementsGroup';

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
  //Props
  const { isDataLoaded = false, animation = 'wave', children = <SkeletonLine /> } = props;

  const root = getNativeElementProps('div', {
    ref,
    role: 'progressbar',
    'aria-busy': 'true',
    'aria-label': 'content is loading',
    children,
    ...props,
  });

  const gradient = resolveShorthand(props.gradient, {
    required: true,
  });

  return {
    isDataLoaded,
    animation,
    components: {
      root: 'div',
      gradient: 'div',
    },
    root,
    gradient,
  };
};
