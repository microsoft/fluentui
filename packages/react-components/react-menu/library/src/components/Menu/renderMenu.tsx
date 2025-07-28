import * as React from 'react';
import { MenuProvider } from '../../contexts/menuContext';
import type { MenuContextValues, MenuState } from './Menu.types';
import type { JSXElement } from '@fluentui/react-utilities';

/**
 * Render the final JSX of Menu
 */
export const renderMenu_unstable = (state: MenuState, contextValues: MenuContextValues): JSXElement => {
  return (
    <MenuProvider value={contextValues.menu}>
      {state.menuTrigger}
      {state.open && state.menuPopover}
    </MenuProvider>
  );
};
