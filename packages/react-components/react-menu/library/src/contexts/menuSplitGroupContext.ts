import * as React from 'react';

/**
 * Context used communicate with a child menu item that it is a trigger for a submenu
 */
const MenuSplitGroupContext = React.createContext<boolean | undefined>(undefined) as React.Context<boolean>;

const menuTriggerContextDefaultValue = false;

export const MenuSplitGroupContextProvider = MenuSplitGroupContext.Provider;
export const useMenuSplitGroupContext_unstable = () =>
  React.useContext(MenuSplitGroupContext) ?? menuTriggerContextDefaultValue;
