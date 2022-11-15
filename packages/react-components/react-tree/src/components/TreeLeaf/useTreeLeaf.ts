import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TreeLeafProps, TreeLeafState } from './TreeLeaf.types';

/**
 * Create the state required to render TreeLeaf.
 *
 * The returned state can be modified with hooks such as useTreeLeafStyles_unstable,
 * before being passed to renderTreeLeaf_unstable.
 *
 * @param props - props from this instance of TreeLeaf
 * @param ref - reference to root HTMLElement of TreeLeaf
 */
export const useTreeLeaf_unstable = (props: TreeLeafProps, ref: React.Ref<HTMLElement>): TreeLeafState => {
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
