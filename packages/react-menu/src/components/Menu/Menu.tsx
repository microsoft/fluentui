import * as React from 'react';
import { useMenu } from './useMenu';
import { useMenuContextValues } from './useMenuContextValues';
import { MenuProps } from './Menu.types';
import { renderMenu } from './renderMenu';

/**
 * Wrapper component that manages state for a popup MenuList and a MenuTrigger
 * {@docCategory Menu }
 */
export const Menu: React.FC<MenuProps> = props => {
  const state = useMenu(props);
  const contextValues = useMenuContextValues(state);

  return renderMenu(state, contextValues);
};

Menu.displayName = 'Menu';
