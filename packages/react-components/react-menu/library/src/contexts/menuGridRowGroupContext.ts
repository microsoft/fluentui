import * as React from 'react';

const MenuGridRowGroupContext = React.createContext<MenuGridRowGroupContextValue | undefined>(
  undefined,
) as React.Context<MenuGridRowGroupContextValue>;

const menuGridRowGroupContextDefaultValue: MenuGridRowGroupContextValue = {};

/**
 * Context
 */
export type MenuGridRowGroupContextValue = {};

export const MenuGridRowGroupContextProvider = MenuGridRowGroupContext.Provider;
export const useMenuGridRowGroupContext_unstable = () =>
  React.useContext(MenuGridRowGroupContext) ?? menuGridRowGroupContextDefaultValue;
