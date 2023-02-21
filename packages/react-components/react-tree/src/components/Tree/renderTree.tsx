import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TreeState, TreeSlots, TreeContextValues } from './Tree.types';
import { TreeProvider } from '../../contexts';

export const renderTree_unstable = (state: TreeState, contextValues: TreeContextValues) => {
  const { slots, slotProps } = getSlots<TreeSlots>(state);

  return (
    <TreeProvider value={contextValues.tree}>
      <slots.root {...slotProps.root}>{slotProps.root.children}</slots.root>
    </TreeProvider>
  );
};
