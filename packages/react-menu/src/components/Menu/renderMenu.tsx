import * as React from 'react';
import { MenuContextValues, MenuState } from './Menu.types';
import { MenuProvider } from '../../contexts/menuContext';

/**
 * Render the final JSX of Menu
 * {@docCategory Menu }
 */
export const renderMenu = (state: MenuState, contextValues: MenuContextValues) => {
  return (
    <MenuProvider value={contextValues.menu}>
      {state.menuTrigger}
      {state.open && state.menuPopover}
    </MenuProvider>
  );
};
