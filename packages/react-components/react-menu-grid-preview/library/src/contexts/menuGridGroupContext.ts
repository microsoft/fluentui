import * as React from 'react';

const MenuGridGroupContext = React.createContext<MenuGridGroupContextValue | undefined>(
  undefined,
) as React.Context<MenuGridGroupContextValue>;

const MenuGridGroupContextDefaultValue: MenuGridGroupContextValue = {
  headerId: '',
};

/**
 * Context used to guarantee correct aria-relationship between row group and header
 */
export type MenuGridGroupContextValue = {
  /**
   * Element id applied to the `MenuGridGroupHeader` component
   */
  headerId: string;
};

export const MenuGridGroupContextProvider = MenuGridGroupContext.Provider;
export const useMenuGridGroupContext_unstable = (): MenuGridGroupContextValue =>
  React.useContext(MenuGridGroupContext) ?? MenuGridGroupContextDefaultValue;
