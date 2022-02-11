import * as React from 'react';
import { useMenu_unstable } from './useMenu';
import type { MenuProps } from './Menu.types';

/**
 * Wrapper component that manages state for a popup MenuList and a MenuTrigger
 */
export const Menu: React.FC<MenuProps> = props => {
  const [state, render, context] = useMenu_unstable(props);

  return render(state, context);
};

Menu.displayName = 'Menu';
