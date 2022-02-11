import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { MenuSplitGroupSlots, MenuSplitGroupRender } from './MenuSplitGroup.types';

/**
 * Render the final JSX of MenuSplitGroup
 */
export const renderMenuSplitGroup_unstable: MenuSplitGroupRender = state => {
  const { slots, slotProps } = getSlots<MenuSplitGroupSlots>(state);

  return <slots.root {...slotProps.root} />;
};
