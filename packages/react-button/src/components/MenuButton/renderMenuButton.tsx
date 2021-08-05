import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { MenuButtonState } from './MenuButton.types';
import { menuButtonShorthandPropsCompat } from './useMenuButton';

/**
 * Renders a MenuButton component by passing the state defined props to the appropriate slots.
 */
export const renderMenuButton = (state: MenuButtonState) => {
  const { slots, slotProps } = getSlotsCompat(state, menuButtonShorthandPropsCompat);
  const { children, iconOnly } = state;

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
      {!iconOnly && children}
      {!iconOnly && <slots.menuIcon {...slotProps.menuIcon} />}
    </slots.root>
  );
};
