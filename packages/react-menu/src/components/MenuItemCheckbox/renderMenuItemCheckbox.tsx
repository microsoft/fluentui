import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { MenuItemCheckboxState } from './MenuItemCheckbox.types';
import { menuItemCheckboxShorthandPropsCompat } from './useMenuItemCheckbox';

/** Function that renders the final JSX of the component  */
export const renderMenuItemCheckbox = (state: MenuItemCheckboxState) => {
  const { slots, slotProps } = getSlotsCompat(state, menuItemCheckboxShorthandPropsCompat);

  return (
    <slots.root {...slotProps.root}>
      <slots.checkmark {...slotProps.checkmark} />
      <slots.icon {...slotProps.icon} />
      <slots.content {...slotProps.content} />
      <slots.secondaryContent {...slotProps.secondaryContent} />
    </slots.root>
  );
};
