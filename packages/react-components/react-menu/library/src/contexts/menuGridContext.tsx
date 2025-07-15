import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';

export const MenuGridContext: Context<MenuGridContextValue> = createContext<MenuGridContextValue | undefined>(
  undefined,
) as Context<MenuGridContextValue>;

const menuGridContextDefaultValue: MenuGridContextValue = {};

/**
 * Context shared between MenuGrid and its children components
 */
export type MenuGridContextValue = {};

export const MenuGridProvider = MenuGridContext.Provider;

export const useMenuGridContext_unstable = <T,>(selector: ContextSelector<MenuGridContextValue, T>) =>
  useContextSelector(MenuGridContext, (ctx = menuGridContextDefaultValue) => selector(ctx));
