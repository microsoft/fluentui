import * as React from 'react';

const MenuListContext = React.createContext<MenuListContext>({
  checkedValues: {},
  onCheckedValueChange: () => null,
  setFocusByFirstCharacter: () => null,
});

// TODO add context selector to reduce the number of rerenders
/**
 * Context shared between MenuList and its children components
 */
export interface MenuListContext {
  checkedValues?: Record<string, string[]>;
  onCheckedValueChange?: (e: React.MouseEvent | React.KeyboardEvent, name: string, items: string[]) => void;
  setFocusByFirstCharacter?: (e: React.KeyboardEvent<HTMLElement>, itemEl: HTMLElement) => void;
}

export const MenuListProvider = MenuListContext.Provider;

export const useMenuListContext = () => React.useContext(MenuListContext);
