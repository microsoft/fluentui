import * as React from 'react';

/**
 * Context used communicate with child that it is a trigger for a menu
 */
const MenuTriggerContext = React.createContext<boolean>(false);

export const MenuTriggerContextProvider = MenuTriggerContext.Provider;
export const useMenuTriggerContext = () => React.useContext(MenuTriggerContext);
