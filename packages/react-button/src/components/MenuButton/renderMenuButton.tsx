import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { MenuButtonSlots, MenuButtonState } from './MenuButton.types';

/**
 * Renders a MenuButton component by passing the state defined props to the appropriate slots.
 */
export const renderMenuButton = (state: MenuButtonState) => {
  const { slots, slotProps } = getSlots<MenuButtonSlots>(state, ['root', 'icon', 'menuIcon']);
  const { icon, iconOnly } = state;

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
      {!iconOnly && slotProps.root.children}
      {(!iconOnly || !icon?.children) && <slots.menuIcon {...slotProps.menuIcon} />}
    </slots.root>
  );
};
