import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { menuItemSlots } from '../MenuItem/index';
import type { MenuItemCheckboxState } from './MenuItemCheckbox.types';
import type { MenuItemSlots } from '../MenuItem/MenuItem.types';

/** Function that renders the final JSX of the component  */
export const renderMenuItemCheckbox = (state: MenuItemCheckboxState) => {
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
