import * as React from 'react';

const MenuListContext = React.createContext<MenuListContext>({
  checkedValues: {},
  onCheckedValueChange: () => null,
});

// TODO add context selector to reduce the number of rerenders
export interface MenuListContext {
  checkedValues?: Record<string, string[]>;
  onCheckedValueChange?: (e: React.MouseEvent | React.KeyboardEvent, name: string, items: string[]) => void;
}

export const MenuListProvider = MenuListContext.Provider;

export const useMenuListContext = () => React.useContext(MenuListContext);
