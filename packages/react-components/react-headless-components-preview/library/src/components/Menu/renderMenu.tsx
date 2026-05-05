import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { MenuProvider } from './menuContext';
import type { MenuState, MenuContextValues } from './Menu.types';

/**
 * Renders the Menu by mounting MenuTrigger always and the MenuPopover
 * subtree only while `open` is true. No motion wrapper, no Portal —
 * the headless MenuPopover renders inline and uses native
 * `popover="auto"` for top-layer placement.
 */
export const renderMenu = (state: MenuState, contextValues: MenuContextValues): JSXElement => (
  <MenuProvider value={contextValues.menu}>
    {state.menuTrigger as React.ReactNode}
    {state.open ? (state.menuPopover as React.ReactNode) : null}
    {state.safeZone}
  </MenuProvider>
);
