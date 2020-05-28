import * as React from 'react';

export type ToolbarMenuContextValue = {
  slots: {
    menu: React.ElementType;
  };
};

export const ToolbarMenuContext = React.createContext<ToolbarMenuContextValue>({
  slots: {
    menu: null,
  },
});

export const ToolbarMenuContextProvider = ToolbarMenuContext.Provider;
