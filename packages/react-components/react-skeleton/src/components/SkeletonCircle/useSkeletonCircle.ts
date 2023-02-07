import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { SkeletonCircleProps, SkeletonCircleState } from './SkeletonCircle.types';

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
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
