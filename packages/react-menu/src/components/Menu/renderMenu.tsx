import * as React from 'react';
import { MenuProvider } from '../../contexts/menuContext';
import type { MenuContextValues, MenuState, MenuRender } from './Menu.types';

/**
 * Render the final JSX of Menu
 */
export const renderMenu_unstable: MenuRender = (state: MenuState, contextValues: MenuContextValues) => {
  return (
    <MenuProvider value={contextValues.menu}>
      {state.menuTrigger}
      {state.open && state.menuPopover}
    </MenuProvider>
  );
};
