import * as React from 'react';

const MenuListContext = React.createContext<MenuListContext>({
  triggerRef: null,
  checkedValues: {},
  onCheckedValuesChange: () => null,
});

export interface MenuListContext {
  triggerRef: React.RefObject<HTMLDivElement> | null;
  checkedValues?: Record<string, string[]>;
  onCheckedValuesChange?: (name: string, value: string[]) => void;
}

export const MenuListProvider = MenuListContext.Provider;

export const useMenuListContext = () => React.useContext(MenuListContext);
