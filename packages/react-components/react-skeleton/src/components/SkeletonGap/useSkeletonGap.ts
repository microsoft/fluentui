import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { SkeletonGapProps, SkeletonGapState } from './SkeletonGap.types';

/**
 * Create the state required to render SkeletonGap.
 *
 * The returned state can be modified with hooks such as useSkeletonGapStyles_unstable,
 * before being passed to renderSkeletonGap_unstable.
 *
 * @param props - props from this instance of SkeletonGap
 * @param ref - reference to root HTMLElement of SkeletonGap
 */
export const useSkeletonGap_unstable = (props: SkeletonGapProps, ref: React.Ref<HTMLElement>): SkeletonGapState => {
  //Props
  const { height = '16px', width = '100%' } = props;

  const root = getNativeElementProps('div', {
    ref,
  });

  return {
    height,
    width,
    components: {
      root: 'div',
    },
    root,
  };
};
