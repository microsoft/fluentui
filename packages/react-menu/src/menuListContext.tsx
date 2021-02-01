import * as React from 'react';

const MenuListContext = React.createContext<MenuListContext>({
  triggerRef: null,
});

export interface MenuListContext {
  triggerRef: React.RefObject<HTMLDivElement> | null;
}

export const MenuListProvider = MenuListContext.Provider;

export const useMenuListContext = () => React.useContext(MenuListContext);
