import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { MenuDividerSlots, MenuDividerState } from './MenuDivider.types';

/**
 * Redefine the render function to add slots. Reuse the menudivider structure but add
 * slots to children.
 */
export const renderMenuDivider_unstable = (state: MenuDividerState) => {
  const { slots, slotProps } = getSlots<MenuDividerSlots>(state);

  return <slots.root {...slotProps.root} />;
};
