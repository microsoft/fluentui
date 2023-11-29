import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { Context, ContextSelector } from '@fluentui/react-context-selector';
import { NavContextValue } from './NavContext.types';

const navContextDefaultValue: NavContextValue = {
  reserveSelectedNavGroupSpace: true,
  selectedValue: undefined,
  onRegister: () => {
    /* noop */
  },
  onUnregister: () => {
    /* noop */
  },
  onSelect: () => {
    /* noop */
  },
  getRegisteredNavGroups: () => {
    return {
      registeredNavGroups: {},
    };
  },
};

export const NavContext: Context<NavContextValue> = createContext<NavContextValue | undefined>(
  undefined,
) as Context<NavContextValue>;

export const NavProvider = NavContext.Provider;
export const useNavContext_unstable = <T>(selector: ContextSelector<NavContextValue, T>): T =>
  useContextSelector(NavContext, (ctx = navContextDefaultValue) => selector(ctx));
