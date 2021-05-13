import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { MenuContext } from '@fluentui/react-shared-contexts';
import { MenuButtonState } from './MenuButton.types';
import { menuButtonShorthandProps } from './useMenuButton';

/**
 * Redefine the render function to add slots. Reuse the button structure but add
 * slots to children.
 */
export const renderMenuButton = (state: MenuButtonState) => {
  const { slots, slotProps } = getSlots(state, menuButtonShorthandProps);
  const { expanded, iconOnly, persistMenu } = state;

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
      {!iconOnly && <slots.children {...slotProps.children} />}
      {!iconOnly && <slots.menuIcon {...slotProps.menuIcon} />}
      {(persistMenu || expanded) && state.menu && (
        <MenuContext.Provider value={state.menu}>
          <slots.menu {...slotProps.menu} />
        </MenuContext.Provider>
      )}
    </slots.root>
  );
};
