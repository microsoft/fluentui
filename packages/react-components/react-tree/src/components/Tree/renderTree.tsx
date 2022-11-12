import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TreeState, TreeSlots } from './Tree.types';

export const renderTree_unstable = (state: TreeState) => {
  const { slots, slotProps } = getSlots<TreeSlots>(state);

  return <slots.root {...slotProps.root} />;
};
