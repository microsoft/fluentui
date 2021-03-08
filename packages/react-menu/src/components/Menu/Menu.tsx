import * as React from 'react';
import { useMenu } from './useMenu';
import { MenuProps } from './Menu.types';
import { renderMenu } from './renderMenu';
import { useMenuStyles } from './useMenuStyles';

/**
 * Wrapper component that manages state for a popup MenuList and a MenuTrigger
 * {@docCategory Menu }
 */
export const Menu = React.forwardRef<HTMLElement, MenuProps>((props, ref) => {
  const state = useMenu(props, ref);

  useMenuStyles(state);
  return renderMenu(state);
});

Menu.displayName = 'Menu';
