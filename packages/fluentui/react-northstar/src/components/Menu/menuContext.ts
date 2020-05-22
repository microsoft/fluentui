import { createContext } from '@fluentui/react-context-selector';
import { ComponentVariablesInput } from '@fluentui/styles';
import * as React from 'react';
import { Accessibility } from '@fluentui/accessibility';

export type MenuContextValue = {
  activeIndex: number;
  variables: ComponentVariablesInput;
  pointing: boolean | 'start' | 'end';
  primary: boolean;
  underlined: boolean;
  iconOnly: boolean;
  vertical: boolean;
  secondary: boolean;
  pills: boolean;
  inSubmenu: boolean;
  onItemClick?: (e: React.KeyboardEvent | React.MouseEvent, itemIndex: number) => void;
  accessibility: { [childBehaviorSlot: string]: Accessibility<any> };
  __parentComponent: React.ElementType;
};

export type MenuContextSubscribedValue = Partial<
  Pick<
    MenuContextValue,
    | 'activeIndex'
    | 'variables'
    | 'onItemClick'
    | 'primary'
    | 'pointing'
    | 'underlined'
    | 'iconOnly'
    | 'vertical'
    | 'inSubmenu'
    | 'pills'
    | 'secondary'
    | 'accessibility'
    | '__parentComponent'
  > & {
    active?: boolean;
  }
>;

export const MenuContext = createContext<MenuContextValue>(
  {
    activeIndex: -1,
    variables: {},
    pointing: false,
    primary: false,
    underlined: false,
    iconOnly: false,
    vertical: false,
    secondary: false,
    pills: false,
    inSubmenu: false,
    accessibility: {},
    __parentComponent: null,
  },
  { strict: false },
);

export const MenuContextProvider = MenuContext.Provider;
