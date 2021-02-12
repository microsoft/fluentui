import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuItemState } from './MenuItem.types';
import { menuItemShorthandProps } from './useMenuItem';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuItem = (state: MenuItemState) => {
  const { slots, slotProps } = getSlots(state, menuItemShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {state.iconPosition === 'before' && <slots.icon {...slotProps.icon} />}
      {state.children}
      {state.iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
