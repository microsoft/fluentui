import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TreeItemLayoutState, TreeItemLayoutSlots } from './TreeItemLayout.types';

/**
 * Render the final JSX of TreeItemLayout
 */
export const renderTreeItemLayout_unstable = (state: TreeItemLayoutState) => {
  const { slots, slotProps } = getSlots<TreeItemLayoutSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
