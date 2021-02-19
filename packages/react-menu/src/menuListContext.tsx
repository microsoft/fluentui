import * as React from 'react';
import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import { SelectableHandler } from './selectable/index';

const MenuListContext = createContext<MenuListContext>({});

// TODO add context selector to reduce the number of rerenders
/**
 * Context shared between MenuList and its children components
 */
export interface MenuListContext {
  checkedValues?: Record<string, string[]>;
  onCheckedValueChange?: (e: React.MouseEvent | React.KeyboardEvent, name: string, items: string[]) => void;
  toggleCheckbox?: SelectableHandler;
  selectRadio?: SelectableHandler;
}

export const MenuListProvider = MenuListContext.Provider;

export const useMenuListContext = <T,>(selector: ContextSelector<MenuListContext, T>) =>
  useContextSelector(MenuListContext, selector);
