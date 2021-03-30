import * as React from 'react';

const MenuGroupContext = React.createContext<MenuGroupContextValue>({ headerId: '' });

/**
 * Context used to guarantee correct aria-relationship between header
 * and group information
 */
export interface MenuGroupContextValue {
  /**
   * Element id applied to the `MenuGroupHeader` component
   */
  headerId: string;
}

export const MenuGroupContextProvider = MenuGroupContext.Provider;
export const useMenuGroupContext = () => React.useContext(MenuGroupContext);
