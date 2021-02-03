import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuItemCheckboxState } from './MenuItemCheckbox.types';
import { menuItemCheckboxShorthandProps } from './useMenuItemCheckbox';

/**
 * Define the render function. Given the state of a button, renders it.
 */
export const renderMenuItemCheckbox = (state: MenuItemCheckboxState) => {
  const { slots, slotProps } = getSlots(state, menuItemCheckboxShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {state.checked && <slots.checkmark {...slotProps.checkmark} />}
      <slots.icon {...slotProps.icon} />
      {state.children}
    </slots.root>
  );
};
