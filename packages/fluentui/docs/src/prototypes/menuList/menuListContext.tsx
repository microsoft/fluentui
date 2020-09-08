import * as React from 'react';

const MenuListContext = React.createContext<MenuListContext>({
  currentIndex: 1,
  setIndex: null,
  setOpen: null,
  triggerRef: null,
});

export interface MenuListContext {
  currentIndex: number;
  setIndex: (index: number) => void;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
}

export const MenuListProvider = MenuListContext.Provider;

export const useMenuListContext = () => React.useContext(MenuListContext);
