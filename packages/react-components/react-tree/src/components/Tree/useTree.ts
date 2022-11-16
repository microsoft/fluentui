import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TreeProps, TreeState } from './Tree.types';

/**
 * Create the state required to render Tree.
 *
 * The returned state can be modified with hooks such as useTreeStyles_unstable,
 * before being passed to renderTree_unstable.
 *
 * @param props - props from this instance of Tree
 * @param ref - reference to root HTMLElement of Tree
 */
export const useTree_unstable = (props: TreeProps, ref: React.Ref<HTMLElement>): TreeState => {
  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
