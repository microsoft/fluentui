import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TreeBranchState, TreeBranchSlots } from './TreeBranch.types';

export const renderTreeBranch_unstable = (state: TreeBranchState) => {
  const { slots, slotProps } = getSlots<TreeBranchSlots>(state);

  return <slots.root {...slotProps.root} />;
};
