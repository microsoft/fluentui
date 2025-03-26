import * as React from 'react';

export type MenuSplitGroupContextValue = {
  setMultiline: (multiline: boolean) => void;
};

/**
 * Context used communicate with a child menu item that it is a trigger for a submenu
 */
const MenuSplitGroupContext = React.createContext<MenuSplitGroupContextValue | undefined>(
  undefined,
) as React.Context<MenuSplitGroupContextValue>;

export const menuSplitGroupContextDefaultValue = {
  setMultiline: () => null,
};

export const MenuSplitGroupContextProvider = MenuSplitGroupContext.Provider;
export const useMenuSplitGroupContext_unstable = () =>
  React.useContext(MenuSplitGroupContext) ?? menuSplitGroupContextDefaultValue;

export const useIsInMenuSplitGroup = () => {
  const context = useMenuSplitGroupContext_unstable();
  return context !== menuSplitGroupContextDefaultValue;
};
