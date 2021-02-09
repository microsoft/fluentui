import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuItemCheckboxState } from './MenuItemCheckbox.types';
import { menuItemCheckboxShorthandProps } from './useMenuItemCheckbox';

/** Function that renders the final JSX of the component  */
export const renderMenuItemCheckbox = (state: MenuItemCheckboxState) => {
  const { slots, slotProps } = getSlots(state, menuItemCheckboxShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.checkmark {...slotProps.checkmark} />
      <slots.icon {...slotProps.icon} />
      {state.children}
    </slots.root>
  );
};
