import * as React from 'react';

const MenuGroupContext = React.createContext<MenuGroupContext>({ headerId: undefined });

export interface MenuGroupContext {
  headerId: string | undefined;
}

export const MenuGroupContextProvider = MenuGroupContext.Provider;
export const useMenuGroupContext = () => React.useContext(MenuGroupContext);
