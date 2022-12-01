import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { SkeletonCircleProps, SkeletonCircleState } from './SkeletonCircle.types';
//import { DefaultCircle } from './DefaultCircle';

/**
 * Create the state required to render SkeletonCircle.
 *
 * The returned state can be modified with hooks such as useSkeletonCircleStyles_unstable,
 * before being passed to renderSkeletonCircle_unstable.
 *
 * @param props - props from this instance of SkeletonCircle
 * @param ref - reference to root HTMLElement of SkeletonCircle
 */
export const useSkeletonCircle_unstable = (
  props: SkeletonCircleProps,
  ref: React.Ref<HTMLElement>,
): SkeletonCircleState => {
  //Props
  const { height = '24px', verticalAlign = 'center' } = props;

  const root = getNativeElementProps('div', { ref });

  return {
    height,
    verticalAlign,
    components: {
      root: 'div',
    },
    root,
  };
};
