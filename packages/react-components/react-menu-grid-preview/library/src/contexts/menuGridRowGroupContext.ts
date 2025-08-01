import * as React from 'react';

const MenuGridRowGroupContext = React.createContext<MenuGridRowGroupContextValue | undefined>(
  undefined,
) as React.Context<MenuGridRowGroupContextValue>;

const menuGridRowGroupContextDefaultValue: MenuGridRowGroupContextValue = {
  headerId: '',
};

/**
 * Context used to guarantee correct aria-relationship between row group and header
 */
export type MenuGridRowGroupContextValue = {
  /**
   * Element id applied to the `MenuGridRowGroupHeader` component
   */
  headerId: string;
};

export const MenuGridRowGroupContextProvider = MenuGridRowGroupContext.Provider;
export const useMenuGridRowGroupContext_unstable = () =>
  React.useContext(MenuGridRowGroupContext) ?? menuGridRowGroupContextDefaultValue;
