import * as React from 'react';

const MenuGroupContext = React.createContext<MenuGroupContext>({ headerId: '' });

/**
 * Context used to guarantee correct aria-relationship between header
 * and group information
 */
export interface MenuGroupContext {
  /**
   * Element id applied to the `MenuGroupHeader` component
   */
  headerId: string;
}

export const MenuGroupContextProvider = MenuGroupContext.Provider;
export const useMenuGroupContext = () => React.useContext(MenuGroupContext);
