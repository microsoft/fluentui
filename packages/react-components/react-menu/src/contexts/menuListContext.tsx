import * as React from 'react';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { SelectableHandler } from '../selectable/index';
import type { MenuListProps } from '../components/index';

export const MenuListContext: Context<MenuListContextValue> = createContext<MenuListContextValue>({
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
export type MenuListContextValue = Pick<
  MenuListProps,
  'checkedValues' | 'onCheckedValueChange' | 'hasIcons' | 'hasCheckmarks'
> & {
  setFocusByFirstCharacter?: (e: React.KeyboardEvent<HTMLElement>, itemEl: HTMLElement) => void;
  toggleCheckbox?: SelectableHandler;
  selectRadio?: SelectableHandler;
};

export const MenuListProvider = MenuListContext.Provider;

export const useMenuListContext_unstable = <T,>(selector: ContextSelector<MenuListContextValue, T>) =>
  useContextSelector(MenuListContext, selector);
