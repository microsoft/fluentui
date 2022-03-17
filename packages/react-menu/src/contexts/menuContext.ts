import * as React from 'react';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { MenuListProps } from '../components/index';
import type { MenuState } from '../components/Menu/index';

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
export type MenuContextValue = MenuListProps &
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
  > & {
    open: boolean;
    triggerId: string;
  };

export const MenuProvider = MenuContext.Provider;

export const useMenuContext_unstable = <T>(selector: ContextSelector<MenuContextValue, T>) =>
  useContextSelector(MenuContext, selector);
