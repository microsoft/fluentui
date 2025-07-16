import * as React from 'react';
import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import { TabsterDOMAttribute } from '@fluentui/react-tabster';

export const MenuGridContext: Context<MenuGridContextValue> = createContext<MenuGridContextValue | undefined>(
  undefined,
) as Context<MenuGridContextValue>;

const menuGridContextDefaultValue: MenuGridContextValue = {
  tableRowTabsterAttribute: null,
};

/**
 * Context shared between MenuGrid and its children components
 */
export type MenuGridContextValue = {
  /**
   * Tabster row attributes applied to the `MenuGridRow` components
   */
  tableRowTabsterAttribute: TabsterDOMAttribute | null;
};

export const MenuGridProvider = MenuGridContext.Provider;

export const useMenuGridContext_unstable = () => React.useContext(MenuGridContext) ?? menuGridContextDefaultValue;
