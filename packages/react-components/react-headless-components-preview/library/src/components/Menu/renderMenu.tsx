import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { MenuProvider } from './menuContext';
import type { MenuState, MenuContextValues } from './Menu.types';

export const renderMenu = (state: MenuState, contextValues: MenuContextValues): JSXElement => (
  <MenuProvider value={contextValues.menu}>
    {state.menuTrigger}
    {state.menuPopover as React.ReactNode}
  </MenuProvider>
);
