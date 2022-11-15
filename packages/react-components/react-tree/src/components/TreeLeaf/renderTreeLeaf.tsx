import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TreeLeafState, TreeLeafSlots } from './TreeLeaf.types';

export const renderTreeLeaf_unstable = (state: TreeLeafState) => {
  const { slots, slotProps } = getSlots<TreeLeafSlots>(state);

  return <slots.root {...slotProps.root} />;
};
