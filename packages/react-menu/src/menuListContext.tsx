import * as React from 'react';
import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import { SelectableHandler } from './selectable/index';

const MenuListContext = createContext<MenuListContextValue>({
  checkedValues: {},
  onCheckedValueChange: () => null,
  toggleCheckbox: () => null,
  selectRadio: () => null,
});

/**
 * Context shared between MenuList and its children components
 */
export interface MenuListContextValue {
  checkedValues?: Record<string, string[]>;
  onCheckedValueChange?: (e: React.MouseEvent | React.KeyboardEvent, name: string, items: string[]) => void;
  toggleCheckbox?: SelectableHandler;
  selectRadio?: SelectableHandler;
}

export const MenuListProvider = MenuListContext.Provider;

export const useMenuListContext = <T,>(selector: ContextSelector<MenuListContextValue, T>) =>
  useContextSelector(MenuListContext, selector);
