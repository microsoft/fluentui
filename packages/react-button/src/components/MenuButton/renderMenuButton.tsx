import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { menuButtonShorthandPropsCompat } from './useMenuButton';
import type { MenuButtonState } from './MenuButton.types';

/**
 * Renders a MenuButton component by passing the state defined props to the appropriate slots.
 */
export const renderMenuButton = (state: MenuButtonState) => {
  const { slots, slotProps } = getSlotsCompat(state, menuButtonShorthandPropsCompat);
  const { children, icon, iconOnly } = state;

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
      {!iconOnly && children}
      {(!iconOnly || !icon.children) && <slots.menuIcon {...slotProps.menuIcon} />}
    </slots.root>
  );
};
