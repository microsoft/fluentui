import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuItemState } from './MenuItem.types';
import { menuItemShorthandProps } from './useMenuItem';

/**
 * Function that renders the final JSX of the component
 * @param state Component state
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
