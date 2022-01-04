import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { menuSplitGroupShorthandProps } from './useMenuSplitGroup';
import type { MenuSplitGroupState, MenuSplitGroupSlots } from './MenuSplitGroup.types';

/**
 * Render the final JSX of MenuSplitGroup
 */
export const renderMenuSplitGroup = (state: MenuSplitGroupState) => {
  const { slots, slotProps } = getSlots<MenuSplitGroupSlots>(state, menuSplitGroupShorthandProps);

  return <slots.root {...slotProps.root} />;
};
