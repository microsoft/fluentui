import * as React from 'react';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { SelectableHandler } from '../selectable/index';
import type { MenuCheckedValueChangeData, MenuCheckedValueChangeEvent, MenuListProps } from '../components/index';

export const MenuListContext: Context<MenuListContextValue> = createContext<MenuListContextValue | undefined>(
  undefined,
) as Context<MenuListContextValue>;

const menuListContextDefaultValue: MenuListContextValue = {
  checkedValues: {},
  setFocusByFirstCharacter: () => null,
  toggleCheckbox: () => null,
  selectRadio: () => null,
  hasIcons: false,
  hasCheckmarks: false,
};

/**
 * Context shared between MenuList and its children components
 */
export type MenuListContextValue = Pick<MenuListProps, 'checkedValues' | 'hasIcons' | 'hasCheckmarks'> & {
  setFocusByFirstCharacter?: (e: React.KeyboardEvent<HTMLElement>, itemEl: HTMLElement) => void;
  toggleCheckbox?: SelectableHandler;
  selectRadio?: SelectableHandler;
  /**
   * Callback when checked items change for value with a name
   *
   * @param event - React's original SyntheticEvent
   * @param data - A data object with relevant information
   *
   * @deprecated this property is not used internally anymore,
   * the signature remains just to avoid breaking changes
   */
  onCheckedValueChange?: (e: MenuCheckedValueChangeEvent, data: MenuCheckedValueChangeData) => void;
};

export const MenuListProvider = MenuListContext.Provider;

export const useMenuListContext_unstable = <T,>(selector: ContextSelector<MenuListContextValue, T>) =>
  useContextSelector(MenuListContext, (ctx = menuListContextDefaultValue) => selector(ctx));
