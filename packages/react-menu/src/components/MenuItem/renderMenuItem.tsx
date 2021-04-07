import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { MenuItemState } from './MenuItem.types';
import { menuItemShorthandProps } from './useMenuItem';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuItem = (state: MenuItemState) => {
  const { slots, slotProps } = getSlots(state, menuItemShorthandProps);

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
