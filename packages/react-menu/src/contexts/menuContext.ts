import * as React from 'react';
import { createContext, useContextSelector, ContextSelector, Context } from '@fluentui/react-context-selector';
import { MenuListProps } from '../components/index';
import { MenuState } from '../components/Menu/index';

export const MenuContext: Context<MenuContextValue> = createContext<MenuContextValue>({
  open: false,
  setOpen: () => false,
  checkedValues: {},
  onCheckedValueChange: () => null,
  defaultCheckedValues: {},
  isSubmenu: false,
  triggerRef: ({ current: null } as unknown) as React.MutableRefObject<HTMLElement>,
  menuPopoverRef: ({ current: null } as unknown) as React.MutableRefObject<HTMLElement>,
  triggerId: '',
  openOnContext: false,
  openOnHover: false,
  hasIcons: false,
  hasCheckmarks: false,
});

/**
 * Context shared between Menu and its children components
 *
 * Extends and drills down MenuList props to simplify API
 */
export interface MenuContextValue
  extends MenuListProps,
    Pick<
      MenuState,
      | 'openOnHover'
      | 'openOnContext'
      | 'triggerRef'
      | 'menuPopoverRef'
      | 'setOpen'
      | 'isSubmenu'
      | 'triggerId'
      | 'hasIcons'
      | 'hasCheckmarks'
      | 'persistOnItemClick'
      | 'inline'
    > {
  open: boolean;
  triggerId: string;
}

export const MenuProvider = MenuContext.Provider;

export const useMenuContext = <T>(selector: ContextSelector<MenuContextValue, T>) =>
  useContextSelector(MenuContext, selector);
