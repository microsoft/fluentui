import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { MenuItemSlots, MenuItemState } from './MenuItem.types';
import { menuItemSlots } from './useMenuItem';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuItem = (state: MenuItemState) => {
  const { slots, slotProps } = getSlots<MenuItemSlots>(state, menuItemSlots);

  return (
    <slots.root {...slotProps.root}>
      <slots.checkmark {...slotProps.checkmark} />
      <slots.icon {...slotProps.icon} />
      <slots.content {...slotProps.content} />
      <slots.secondaryContent {...slotProps.secondaryContent} />
      {state.hasSubmenu && <slots.submenuIndicator {...slotProps.submenuIndicator} />}
    </slots.root>
  );
};
