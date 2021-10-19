import { createContext } from '@fluentui/react-bindings';
import { ComponentVariablesInput } from '@fluentui/styles';
import * as React from 'react';
import { Accessibility } from '@fluentui/accessibility';
import { MenuItemProps } from './MenuItem';

export type MenuContextValue = {
  activeIndex: number;
  vertical: boolean;
  variables: ComponentVariablesInput;
  onItemClick: (e: React.KeyboardEvent | React.MouseEvent, itemProps: MenuItemProps) => void;
  onItemSelect: (e: React.KeyboardEvent | React.MouseEvent, itemIndex: number) => void;

  slotProps: {
    item: Record<string, any>;
    divider: Record<string, any>;
  };

  behaviors: {
    item: Accessibility;
    divider: Accessibility;
  };
};

export type MenuItemSubscribedValue = Pick<
  MenuContextValue,
  'variables' | 'onItemClick' | 'onItemSelect' | 'vertical'
> & {
  slotProps: MenuContextValue['slotProps']['item'];
  accessibility: MenuContextValue['behaviors']['item'];
  active: boolean;
};

export type MenuDividerSubscribedValue = Pick<MenuContextValue, 'variables'> & {
  slotProps: MenuContextValue['slotProps']['divider'];
  accessibility: MenuContextValue['behaviors']['divider'];
};

export const MenuContext = createContext<MenuContextValue>({
  activeIndex: -1,
  vertical: false,
  variables: {},
  onItemClick: null,
  onItemSelect: null,
  slotProps: {
    item: {},
    divider: {},
  },
  behaviors: {
    item: undefined,
    divider: undefined,
  },
});

export const MenuContextProvider = MenuContext.Provider;
