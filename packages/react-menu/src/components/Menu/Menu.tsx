import * as React from 'react';
import { useMenu_unstable } from './useMenu';
import { useMenuContextValues_unstable } from './useMenuContextValues';
import { renderMenu_unstable } from './renderMenu';
import type { MenuProps } from './Menu.types';

/**
 * Wrapper component that manages state for a popup MenuList and a MenuTrigger
 */
export const Menu: React.FC<MenuProps> = props => {
  const state = useMenu_unstable(props);
  const contextValues = useMenuContextValues_unstable(state);

  return renderMenu_unstable(state, contextValues);
};

Menu.displayName = 'Menu';
