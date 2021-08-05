import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { MenuItemRadioState } from './MenuItemRadio.types';
import { MenuItemSlots } from '../MenuItem/MenuItem.types';
import { menuItemSlots } from '../MenuItem/index';

/**
 * Redefine the render function to add slots. Reuse the menuitemradio structure but add
 * slots to children.
 */
export const renderMenuItemRadio = (state: MenuItemRadioState) => {
  const { slots, slotProps } = getSlots<MenuItemSlots>(state, menuItemSlots);

  return (
    <slots.root {...slotProps.root}>
      <slots.checkmark {...slotProps.checkmark} />
      <slots.icon {...slotProps.icon} />
      <slots.content {...slotProps.content} />
      <slots.secondaryContent {...slotProps.secondaryContent} />
    </slots.root>
  );
};
