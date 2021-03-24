import * as React from 'react';
import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import { MenuListProps } from './components/index';
import { MenuState } from './components/Menu/index';

const MenuContext = createContext<MenuContextValue>({
  open: false,
  setOpen: () => false,
  checkedValues: {},
  onCheckedValueChange: () => null,
  defaultCheckedValues: {},
  hasMenuContext: false,
  triggerRef: (null as unknown) as React.MutableRefObject<HTMLElement>,
  triggerId: '',
  onContext: false,
  onHover: false,
});

/**
 * Context shared between Menu and its children components
 *
 * Extends and drills down MenuList props to simplify API
 */
export interface MenuContextValue extends MenuListProps, Pick<MenuState, 'onHover' | 'onContext' | 'triggerRef'> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasMenuContext: boolean;
  triggerId: string;
}

export const MenuProvider = MenuContext.Provider;

export const useMenuContext = <T>(selector: ContextSelector<MenuContextValue, T>) =>
  useContextSelector(MenuContext, selector);
