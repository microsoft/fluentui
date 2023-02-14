import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { SkeletonLineProps, SkeletonLineState } from './SkeletonLine.types';

/**
 * Create the state required to render SkeletonLine.
 *
 * The returned state can be modified with hooks such as useSkeletonLineStyles_unstable,
 * before being passed to renderSkeletonLine_unstable.
 *
 * @param props - props from this instance of SkeletonLine
 * @param ref - reference to root HTMLElement of SkeletonLine
 */
export const useSkeletonLine_unstable = (props: SkeletonLineProps, ref: React.Ref<HTMLElement>): SkeletonLineState => {
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
