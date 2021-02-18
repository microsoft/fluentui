import * as React from 'react';

export const MenuContext = React.createContext<any>({});

export const MenuContextProvider = MenuContext.Provider;

export const useMenuContext = () => React.useContext(MenuContext);
