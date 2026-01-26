import * as React from 'react';

const MenuGridCellContext = React.createContext<MenuGridCellContextValue | undefined>(
  undefined,
) as React.Context<MenuGridCellContextValue>;

const menuGridCellContextDefaultValue: MenuGridCellContextValue = {};

/**
 * Context
 */
export type MenuGridCellContextValue = {};

export const MenuGridCellContextProvider = MenuGridCellContext.Provider;
export const useMenuGridCellContext_unstable = () =>
  React.useContext(MenuGridCellContext) ?? menuGridCellContextDefaultValue;
