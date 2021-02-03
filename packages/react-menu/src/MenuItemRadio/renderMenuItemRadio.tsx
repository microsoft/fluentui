import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuItemRadioState } from './MenuItemRadio.types';
import { menuItemRadioShorthandProps } from './useMenuItemRadio';

/** Function that renders the final JSX of the component  */
export const renderMenuItemRadio = (state: MenuItemRadioState) => {
  const { slots, slotProps } = getSlots(state, menuItemRadioShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {state.checked && <slots.checkmark {...slotProps.checkmark} />}
      <slots.icon {...slotProps.icon} />
      {state.children}
    </slots.root>
  );
};
