import * as React from 'react';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { MenuState } from '../components/Menu/index';

export const MenuContext: Context<MenuContextValue> = createContext<MenuContextValue | undefined>(
  undefined,
) as Context<MenuContextValue>;

const menuContextDefaultValue: MenuContextValue = {
  open: false,
  setOpen: () => false,
  checkedValues: {},
  onCheckedValueChange: () => null,
  isSubmenu: false,
  triggerRef: { current: null } as unknown as React.MutableRefObject<HTMLElement>,
  menuPopoverRef: { current: null } as unknown as React.MutableRefObject<HTMLElement>,
  mountNode: null,
  triggerId: '',
  openOnContext: false,
  openOnHover: false,
  hasIcons: false,
  hasCheckmarks: false,
  inline: false,
  persistOnItemClick: false,
};

/**
 * Context shared between Menu and its children components
 *
 * Extends and drills down MenuList props to simplify API
 */
export type MenuContextValue = Pick<
  MenuState,
  | 'openOnHover'
  | 'openOnContext'
  | 'triggerRef'
  | 'menuPopoverRef'
  | 'setOpen'
  | 'isSubmenu'
  | 'mountNode'
  | 'triggerId'
  | 'hasIcons'
  | 'hasCheckmarks'
  | 'persistOnItemClick'
  | 'inline'
  | 'checkedValues'
  | 'onCheckedValueChange'
> & {
  open: boolean;
  triggerId: string;
  /**
   * Default values to be checked on mount
   * @deprecated this property is not used internally anymore,
   * the signature remains just to avoid breaking changes
   */
  defaultCheckedValues?: Record<string, string[]>;
};

export const MenuProvider = MenuContext.Provider;

export const useMenuContext_unstable = <T>(selector: ContextSelector<MenuContextValue, T>) =>
  useContextSelector(MenuContext, (ctx = menuContextDefaultValue) => selector(ctx));
