import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { MenuSplitGroupState, MenuSplitGroupSlots } from './MenuSplitGroup.types';

/**
 * Render the final JSX of MenuSplitGroup
 */
export const renderMenuSplitGroup_unstable = (state: MenuSplitGroupState) => {
  const { slots, slotProps } = getSlots<MenuSplitGroupSlots>(state);

  return <slots.root {...slotProps.root} />;
};
