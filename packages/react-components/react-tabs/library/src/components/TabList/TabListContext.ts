import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { Context, ContextSelector } from '@fluentui/react-context-selector';
import { TabListContextValue } from './TabList.types';

const tabListContextDefaultValue: TabListContextValue = {
  appearance: 'transparent',
  reserveSelectedTabSpace: true,
  selectTabOnFocus: false,
  disabled: false,
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
  getRegisteredTabs: () => {
    return {
      registeredTabs: {},
    };
  },
  size: 'medium',
  vertical: false,
};

export const TabListContext: Context<TabListContextValue> = createContext<TabListContextValue | undefined>(
  undefined,
) as Context<TabListContextValue>;

export const TabListProvider = TabListContext.Provider;
export const useTabListContext_unstable = <T>(selector: ContextSelector<TabListContextValue, T>): T =>
  useContextSelector(TabListContext, (ctx = tabListContextDefaultValue) => selector(ctx));
