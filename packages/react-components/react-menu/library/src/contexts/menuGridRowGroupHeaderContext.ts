import * as React from 'react';

const MenuGridRowGroupHeaderContext = React.createContext<MenuGridRowGroupHeaderContextValue | undefined>(
  undefined,
) as React.Context<MenuGridRowGroupHeaderContextValue>;

const menuGridRowGroupHeaderContextDefaultValue: MenuGridRowGroupHeaderContextValue = {};

/**
 * Context
 */
export type MenuGridRowGroupHeaderContextValue = {};

export const MenuGridRowGroupHeaderContextProvider = MenuGridRowGroupHeaderContext.Provider;
export const useMenuGridRowGroupHeaderContext_unstable = () =>
  React.useContext(MenuGridRowGroupHeaderContext) ?? menuGridRowGroupHeaderContextDefaultValue;
