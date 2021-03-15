import * as React from 'react';
import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import { MenuListProps } from './components/index';

const MenuContext = createContext<MenuContextValue>({
  open: false,
  setOpen: () => false,
  checkedValues: {},
  onCheckedValueChange: () => null,
  defaultCheckedValues: {},
  hasMenuContext: false,
});

/**
 * Context shared between Menu and its children components
 *
 * Extends and drills down MenuList props to simplify API
 */
export interface MenuContextValue extends MenuListProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasMenuContext: boolean;
}

export const MenuProvider = MenuContext.Provider;

export const useMenuContext = <T>(selector: ContextSelector<MenuContextValue, T>) =>
  useContextSelector(MenuContext, selector);
