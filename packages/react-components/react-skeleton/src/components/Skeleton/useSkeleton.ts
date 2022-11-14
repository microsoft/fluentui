import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { SkeletonProps, SkeletonState } from './Skeleton.types';

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
  const { color, isDataLoaded = false } = props;

  const root = getNativeElementProps('div', {
    ref,
    role: 'progressbar',
    ...props,
  });

  const wrapper = resolveShorthand(props.wrapper, {
    required: true,
  });

  const gradient = resolveShorthand(props.gradient, {
    required: true,
  });

  const data = resolveShorthand(props.data, {
    required: false,
  });

  return {
    color,
    isDataLoaded,
    components: {
      root: 'div',
      wrapper: 'div',
      gradient: 'div',
      data: 'div',
    },
    root,
    wrapper,
    gradient,
    data,
  };
};
