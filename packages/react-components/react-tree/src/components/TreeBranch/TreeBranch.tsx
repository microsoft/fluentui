import * as React from 'react';
import { useTreeBranch_unstable } from './useTreeBranch';
import { renderTreeBranch_unstable } from './renderTreeBranch';
import { useTreeBranchStyles_unstable } from './useTreeBranchStyles';
import type { TreeBranchProps } from './TreeBranch.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A tree branch component allows you to create more branches in a tree component
 */
export const TreeBranch: ForwardRefComponent<TreeBranchProps> = React.forwardRef((props, ref) => {
  const state = useTreeBranch_unstable(props, ref);

  useTreeBranchStyles_unstable(state);
  return renderTreeBranch_unstable(state);
});

TreeBranch.displayName = 'TreeBranch';
