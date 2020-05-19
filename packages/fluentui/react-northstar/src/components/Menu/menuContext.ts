import { createContext } from '@fluentui/react-context-selector';
import { ComponentVariablesInput } from '@fluentui/styles';
import * as React from 'react';
import { MenuItemProps } from './MenuItem';

export type MenuContextValue = {
  activeIndex: number;
  variables: ComponentVariablesInput;

  onItemClick?: (e: React.KeyboardEvent | React.MouseEvent, itemIndex: MenuItemProps) => void;
};

export type MenuContextSubscribedValue = Pick<MenuContextValue, 'activeIndex' | 'variables' | 'onItemClick'> & {
  active: boolean;
};

export const MenuContext = createContext<MenuContextValue>({
  activeIndex: -1,
  variables: {},
});

export const MenuContextProvider = MenuContext.Provider;
