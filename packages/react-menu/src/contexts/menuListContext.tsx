import * as React from 'react';
import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import { SelectableHandler } from '../selectable/index';
import { MenuListProps } from '../components/index';

const MenuListContext = createContext<MenuListContextValue>({
  checkedValues: {},
  onCheckedValueChange: () => null,
  setFocusByFirstCharacter: () => null,
  toggleCheckbox: () => null,
  selectRadio: () => null,
  hasIcons: false,
  hasCheckmarks: false,
});

/**
 * Context shared between MenuList and its children components
 */
export interface MenuListContextValue
  extends Pick<MenuListProps, 'checkedValues' | 'onCheckedValueChange' | 'hasIcons' | 'hasCheckmarks'> {
  setFocusByFirstCharacter?: (e: React.KeyboardEvent<HTMLElement>, itemEl: HTMLElement) => void;
  toggleCheckbox?: SelectableHandler;
  selectRadio?: SelectableHandler;
}

export const MenuListProvider = MenuListContext.Provider;

export const useMenuListContext = <T,>(selector: ContextSelector<MenuListContextValue, T>) =>
  useContextSelector(MenuListContext, selector);
