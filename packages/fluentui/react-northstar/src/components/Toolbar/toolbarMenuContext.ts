import { createContext } from '@fluentui/react-bindings';
import * as React from 'react';

export type ToolbarMenuContextValue = {
  slots: {
    menu: React.ElementType;
  };
};

export type ToolbarItemSubscribedValue = {
  menuSlot: ToolbarMenuContextValue['slots']['menu'];
};

export const ToolbarMenuContext = createContext<ToolbarMenuContextValue>({
  slots: {
    menu: null,
  },
});

export const ToolbarMenuContextProvider = ToolbarMenuContext.Provider;
