import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuItemState } from './MenuItem.types';
import { menuItemShorthandProps } from './useMenuItem';

/**
 * Define the render function. Given the state of a button, renders it.
 */
export const renderMenuItem = (state: MenuItemState) => {
  const { slots, slotProps } = getSlots(state, menuItemShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
      {state.children}
    </slots.root>
  );
};
