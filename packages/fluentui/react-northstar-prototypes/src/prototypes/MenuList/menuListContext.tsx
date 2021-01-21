import * as React from 'react';

const MenuListContext = React.createContext<MenuListContext>({
  currentIndex: 1,
  setIndex: null,
  setOpen: null,
  triggerRef: null,
  checkedItems: [],
  onItemChecked: () => null,
  onItemUnChecked: () => null,
});

export interface MenuListContext {
  currentIndex: number;
  setIndex: (index: number) => void;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  checkedItems: number[];
  onItemChecked: (item: number) => void;
  onItemUnChecked: (item: number) => void;
}

export const MenuListProvider = MenuListContext.Provider;

export const useMenuListContext = () => React.useContext(MenuListContext);
