import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TreeBranchProps, TreeBranchState } from './TreeBranch.types';

/**
 * Create the state required to render TreeBranch.
 *
 * The returned state can be modified with hooks such as useTreeBranchStyles_unstable,
 * before being passed to renderTreeBranch_unstable.
 *
 * @param props - props from this instance of TreeBranch
 * @param ref - reference to root HTMLElement of TreeBranch
 */
export const useTreeBranch_unstable = (props: TreeBranchProps, ref: React.Ref<HTMLElement>): TreeBranchState => {
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
