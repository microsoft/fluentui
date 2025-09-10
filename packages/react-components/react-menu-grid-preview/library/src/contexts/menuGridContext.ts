import * as React from 'react';
import { TabsterDOMAttribute } from '@fluentui/react-tabster';

export const MenuGridContext = React.createContext<MenuGridContextValue | undefined>(
  undefined,
) as React.Context<MenuGridContextValue>;

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

export const MenuGridContextProvider = MenuGridContext.Provider;

export const useMenuGridContext_unstable = (): MenuGridContextValue =>
  React.useContext(MenuGridContext) ?? menuGridContextDefaultValue;
