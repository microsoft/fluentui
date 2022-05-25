import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import { TabListContextValue } from './TabList.types';

export const TabListContext: Context<TabListContextValue> = createContext<TabListContextValue>({
  appearance: 'transparent',
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
});
