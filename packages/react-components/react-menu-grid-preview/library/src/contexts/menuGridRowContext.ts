import * as React from 'react';

const MenuGridRowContext = React.createContext<MenuGridRowContextValue | undefined>(
  undefined,
) as React.Context<MenuGridRowContextValue>;

const menuGridRowContextDefaultValue: MenuGridRowContextValue = {};

/**
 * Context
 */
export type MenuGridRowContextValue = {};

export const MenuGridRowContextProvider = MenuGridRowContext.Provider;
export const useMenuGridRowContext_unstable = () =>
  React.useContext(MenuGridRowContext) ?? menuGridRowContextDefaultValue;
