import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { MenuItemCheckboxState } from './MenuItemCheckbox.types';
import { MenuItemSlots } from '../MenuItem/MenuItem.types';
import { menuItemSlots } from '../MenuItem/index';

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
